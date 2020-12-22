export const UpdateObject = (prevObject, newValues) => {
    return {
        ...prevObject,
        ...newValues
    }
}