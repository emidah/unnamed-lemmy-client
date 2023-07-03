import { LemmyHttp, GetPostsResponse } from 'lemmy-js-client';

const createClient = (url: string) => { 
    const client = new LemmyHttp(url);
    const toReturn: LemmyClient = {
        getPosts: () => log('get posts') && client.getPosts({ type_: "All", page: 1, limit: 40, sort: "TopDay" })
    };
    return toReturn;
};

const log = (method: string) : true => {
    console.log(method);
    return true;
}

type LemmyClient = {
    getPosts: () => Promise<GetPostsResponse>;
}

export { createClient };
export type { LemmyClient }