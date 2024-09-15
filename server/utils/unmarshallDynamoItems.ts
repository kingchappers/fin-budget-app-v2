import { AttributeValue } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

export function unmarshallDynamoItemArray(itemArray: Record<string, AttributeValue>[]) {
    let unmarshalledArray: object[] = []

    itemArray.forEach(Item => {
        const unmarshalleditem = unmarshall(Item)
        unmarshalledArray.push(unmarshalleditem)
    });

    return unmarshalledArray
}