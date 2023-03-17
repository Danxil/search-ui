import { useFetcher, useLoaderData, useSubmit } from '@remix-run/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import type { Moment } from 'moment';

import type { RequestObject, SearchModel } from '../types'
import { SORT_SWITCH_VALUE } from '../constants';

import type { Response } from '~/routes/index';
import type { loader } from '~/routes';

export const formatDate = (date: Moment) => date.utc().format();

const searchModelToRequestObject = ({ dateRange, ...model }: SearchModel): RequestObject => {
  const dateRangeString = dateRange.map((rangeItem) => rangeItem ? formatDate(rangeItem) : '') as [string, string]
  
  return {
    ...model,
    sort: model.sort ? SORT_SWITCH_VALUE : '',
    publicationDateFrom: dateRangeString[0],
    publicationDateTo: dateRangeString[1]
  }
}

export type BaseViewReturnType = {
  data: Omit<Response, 'result'> & { result: Response['result'] | null};
  load: (model: SearchModel) => void;
}

export type ScrollViewReturnType = {
  loadWithoutNavigation: (model: SearchModel) => void;
} & BaseViewReturnType;

export type ReturnType = BaseViewReturnType | ScrollViewReturnType;

// Temporary solution of the Remix bug - https://github.com/remix-run/remix/issues/5557
const ignoreExtraLoadFromFetcher = { value: false };

export default (
  paginationView: boolean,
): ReturnType => {
  const data = useLoaderData<typeof loader>();

  const fetcher = useFetcher();
  const submit = useSubmit();

  const load = useRef(debounce((model: SearchModel) => {
    let formData = new FormData();

    const requestObject = searchModelToRequestObject(model)

    Object.keys(requestObject)
      .forEach(key => {
        if (!paginationView && key === 'page') return;

        formData.append(key, requestObject[key as keyof RequestObject].toString())
      })
    
    submit(formData);
  }, 300)).current;

  if (paginationView) {
    return {
      load,
      data,
    }
  } else {
    const [virtualData, setVirtualData] = useState<typeof data.result | null>(data.result);

    const dataObject = useMemo(() => ({
      ...data,
      result: virtualData,
    }), [data, virtualData]);
  
    const loadWithoutNavigation = useRef((model: SearchModel) => {
      ignoreExtraLoadFromFetcher.value = false;

      const requestObject = searchModelToRequestObject(model)

      requestObject.page++;

      const url = Object.keys(requestObject).reduce((prev, key) => {
        return `${prev}&${key}=${requestObject[key as keyof RequestObject]}`
      }, '/?index');
      
      fetcher.load(url);
    }).current;

    const loadAndResetList = useRef((model: SearchModel) => {
      ignoreExtraLoadFromFetcher.value = true;

      setVirtualData(null);

      load(model)
    }).current;

    useEffect(() => {
      if (ignoreExtraLoadFromFetcher.value) return;

      setVirtualData([...(virtualData || []), ...(fetcher.data?.result || []) ])
    }, [fetcher.type])

    useEffect(() => {
      const firstLoad = fetcher.type === 'init';
      const waitingForResponse = virtualData === null;

      const prevData = firstLoad && !waitingForResponse ? [] : virtualData || [];

      setVirtualData([...(prevData), ...(data?.result || []) ]);
    }, [data.result]);

    return {
      load: loadAndResetList,
      loadWithoutNavigation,
      data: dataObject,
    }
  }
}