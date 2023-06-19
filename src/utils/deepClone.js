/*深拷贝引用数据类型 */
function deepClone(target) {
    if (typeof target === "object" && target !== null) {
        return JSON.parse(JSON.stringify(target));
    } else {
        return target;
    }
}
export default deepClone