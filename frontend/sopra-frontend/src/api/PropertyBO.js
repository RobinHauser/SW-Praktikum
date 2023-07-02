import BusinessObject from './BusinessObject';

/**
 * Represents a property object.
 */
export default class PropertyBO extends BusinessObject {

    /**
     * Constructs a new PropertyBO object.
     *
     * @param {*} id - id of property.
     * @param {*} name - name of the property
     * @param {*} isSelection - decides whether the property is a selection property or a free text property
     * @param {*} description - description of the property
     constructor(id, name, isSelection, description) {
    super()
    this.id = id;
    this.name = name;
    this.isSelection = isSelection;
    this.description = description
  }

     /**
     * Sets the id of this PropertyBO.
     *
     * @param {*} id - the new id of this PropertyBO.
     */
    setPropertyID(id) {
        this.id = id;
    }

    /**
     * Gets the id of this PropertyBO.
     */
    getPropertyID() {
        return parseInt(this.id);
    }

    /**
     * Sets the name of thís propertyBO
     *
     * @param {*} name - the new name of this PropertyBO.
     */
    setPropertyName(name) {
        this.name = name;
    }

    /**
     * Gets the name of thís propertyBO
     */
    getPropertyName() {
        return this.name;
    }

    /**
     * Sets whether this PropertyBO is a selection property or a free text property
     *
     * @param {*} isSelection - the new email of this UserBO.
     */
    setIsSelection(isSelection) {
        this.isSelection = isSelection;
    }


    /**
     * Gets whether the PropertyBO is a selection property or a free text property
     */
    getIsSelection() {
        return this.isSelection;
    }

    /**
     * Sets the description of this PropertyBO
     *
     * @param {*} description - the new description of this PropertyBO.
     */
    setPropertyDescription(description) {
        this.description = description;
    }

    /**
     * Gets the description of this PropertyBO.
     */
    getPropertyDescription() {
        return this.description;
    }


    /**
     * Returns an Array of ProfileBOs from a given JSON structure
     */
    static fromJSON(propertys) {
        let result = [];

        if (Array.isArray(propertys)) {
            propertys.forEach((a) => {
                Object.setPrototypeOf(a, PropertyBO.prototype);
                result.push(a);
            })
        } else {
            // Es handelt sich offenbar um ein singuläres Objekt
            let a = propertys;
            Object.setPrototypeOf(a, PropertyBO.prototype);
            result.push(a);
        }

        return result;
    }
}