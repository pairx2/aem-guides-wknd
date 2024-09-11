import traverse from "traverse";

const flattenObject = (response = {}) => {
    const traverseObj = traverse(response);
    const processedArray = traverseObj.reduce(function (acc, x) {
        if (this.isLeaf) {
            const item = this.path;
            const length = item.length;
            let categoryType = null;
            let name = this.key;
            let value = x;
            if (length > 1 && Array.isArray(this.parent.node)) {
                if (!isNaN(item[length - 1]) && parseInt(item[length - 1], 10) >= 1)
                    return acc;
                name = item[length - 2];
                value = [...this.parent.node];
            }
            if (length >= 2 && typeof this.parent.node === "object") {
                const path = [...this.path];
                path.length = length - 2;
                const superParent = traverseObj.get(path);
                if (Array.isArray(superParent)) {
                    categoryType = path.pop() + "[]";
                } else {
                    categoryType = this.path[length - 2];
                }
            }
            acc.push({
                value,
                name,
                path: this.path,
                categoryType
            });
        }
        return acc;
    }, []);
    
    const ADDRESS_KEY = "address";
    const lookField = [ADDRESS_KEY, "lineOne", "city", "state", "zipCode", "zip"];

    let isAddressExist = false;
    const addressFields = processedArray.filter(({ name = "" }) => {
        if (name === ADDRESS_KEY) {
            isAddressExist = true;
        }
        return lookField.includes(name);
    });
    if (!isAddressExist) {
        const addr = {};
        addressFields.map(({ name, value }) => {
            addr[name] = value;
        });
        if ((addr["lineOne"] || addr["city"] || addr["state"])) {
            processedArray.push({
                name: ADDRESS_KEY,
                value: `${addr.lineOne || ""}, ${addr.city || ""}, ${addr.state || ""}, ${addr.zipCode || addr.zip || ""}`,
                type: "googleApi"
            })
        }
    }
    return processedArray;
}

export { flattenObject };