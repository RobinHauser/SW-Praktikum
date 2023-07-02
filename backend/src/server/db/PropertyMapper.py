from src.server.bo.Property import Property
from src.server.db.Mapper import Mapper

"""
This entire mapper class was designed to manage properties. However, the separation of the two property types
(selection property and text property) led to the creation of the two respective mapper classes. This left the entire
PropertyMapper class and its functions unused, as well as the Property Operations section in the Admin class. 
For contingency reasons, we decided not to delete the class and its functions. 
"""
class PropertyMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self):
        """
        finds all properties in the system
        :return: a list of all properties
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * FROM property")
        tuples = cursor.fetchall()

        for (property_id, name, is_selection, description) in tuples:
            property = Property()
            property.set_id(property_id)
            property.set_name(name)
            property.set_is_selection(is_selection)
            property.set_description(description)
            result.append(property)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        """
        finds the property with the given property_id
        :param id: id of the property
        :return: property object of that id
        """
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT * FROM property WHERE PropertyID={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (property_id, name, is_selection, description) = tuples[0]
            property = Property()
            property.set_id(property_id)
            property.set_name(name)
            property.set_is_selection(is_selection)
            property.set_description(description)
            result = property
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_name(self, name):
        """
        finds a property by its name
        :param name: name of the property
        :return: property object with given name
        """
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT * FROM property WHERE Name LIKE '{}'".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (property_id, name, is_selection, description) = tuples[0]
            property = Property()
            property.set_id(property_id)
            property.set_name(name)
            property.set_is_selection(is_selection)
            property.set_description(description)
            result = property
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result


    def insert(self, property):
        """
        creates a new property entry
        :param property: property object
        :return: inserted property entry
        """
        cursor = self._cnx.cursor()

        # ID Handling with specified ID range
        cursor.execute("SELECT MAX(PropertyID) AS maxid FROM property")
        tuples = cursor.fetchall()

        for maxid in tuples:
            if maxid[0] is not None:
                property.set_id(maxid[0]+1)
            else:
                property.set_id(6001)

        command = "INSERT INTO property (PropertyID, Name, IsSelection, Description) VALUES (%s,%s,%s,%s)"
        data = (property.get_id(), property.get_name(), property.get_is_selection(), property.get_description())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return property

    def update(self, sel_prop):
        pass

    def delete(self, property):
        """
        deletes given property
        :param property: property to be deleted
        :return: deleted property
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM property WHERE PropertyID={}".format(property.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

