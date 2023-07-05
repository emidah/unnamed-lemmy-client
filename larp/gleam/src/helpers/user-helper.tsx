import { Person } from "lemmy-js-client";
import { getClient } from "../lemmy-client/client";

export function formatCreator(creator: Person): string {
    const client = getClient();
    const { data: federated } = client.getFederated();
    let instanceName: string = "???";
    if(federated){
       const instance = federated.get(creator.instance_id);
       instanceName = instance?.domain ?? instanceName;
    }
    const name = `@${creator.name}@${instanceName}`;
    return name;
}