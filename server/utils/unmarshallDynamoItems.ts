import { AttributeValue } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

export function unmarshallDynamoItemArray(itemArray: Record<string, AttributeValue>[]) {
    let unmarshalledArray: object[] = [];

    itemArray.forEach(item => {
        const unmarshalledItem = unmarshall(item);
        unmarshalledArray.push(unmarshalledItem)
    });

    return unmarshalledArray;
}

export function unmarshallDynamoItem(item: Record<string, AttributeValue>) {
    const unmarshalledItem = unmarshall(item);

    return unmarshalledItem;
}