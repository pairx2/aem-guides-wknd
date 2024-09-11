/**
 *  This function is an alternative to `object optional chaining` and https://lodash.com/docs/4.17.15#get in order to get object nested
 *  properties without having javascript exceptions when property not present.
 *
 *  This is the gist with examples and test cases: https://gist.github.com/jeneg/9767afdcca45601ea44930ea03e0febf?permalink_comment_id=3515777#gistcomment-3515777
 *
 *  Examples:
 *  - With an object:
 *    - Before: `response?.response?.data?.customer?.orders?.items?.length;`
 *    - After:  `getNestedObject(response,"response.data.customer.orders.items.length");`
 *  - With DOM elements
 *    - Before: `document.querySelector("#userName")?.value;`
 *    - After: `getNestedObject(document.querySelector("#userName"),"value");`
 *
 * @param {object} object : The object where we are going to read the propertie from
 * @param {string} path : E.g. "child.child2.child3.child4"
 * @param {*} defaultValue : In case the nested property isn't found, a default value can be set, otherwise, `undefined` is going to be returned
 * @returns Return the object propery value or [defaultValue || undefined] if property not found
 */
const getNestedObject = (object, path, defaultValue) => {
  return String(path)
    .split(".")
    .reduce((acc, v) => {
      try {
        acc = acc[v] !== undefined && acc[v] !== null ? acc[v] : defaultValue;
      } catch (e) {
        return defaultValue;
      }
      return acc;
    }, object);
};
