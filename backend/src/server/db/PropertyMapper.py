from server.bo import Property
from server.db import Mapper as Mapper


class PropertyMapper(Mapper.Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self):
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * FROM property")
        tuples = cursor.fetchall()

        for (property_id, value, description, is_dropdown) in tuples:
            property = Property()
            property.set_id(property_id)
            property.set_value(value)
            property.set_description(description)
            property.set_is_dropdown(is_dropdown)
            result.append(property)

            self._cnx.commit()
            cursor.close()

            return result

    def find_by_id(self, id):
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT * FROM property WHERE PropertyID={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (property_id, value, description, is_dropdown) = tuples[0]
            property = Property()
            property.set_id(property_id)
            property.set_value(value)
            property.set_description(description)
            property.set_is_dropdown(is_dropdown)
            result = property
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_name(self, name):
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT * FROM property WHERE Value LIKE '{}'".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (property_id, value, description, is_dropdown) = tuples[0]
            property = Property()
            property.set_id(property_id)
            property.set_value(value)
            property.set_description(description)
            property.set_is_dropdown(is_dropdown)
            result = property
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, property):
        cursor = self._cnx.cursor()

        command = "INSERT INTO property (propertyid, value, description, is_dropdown) VALUES (%s,%s,%s,%s)"
        data = (property.get_id(), property.get_value(), property.get_description(), property.get_is_dropdown())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return property

    def update(self, property):
        cursor = self._cnx.cursor()

        command = "UPDATE property SET Value=%s, Description=%s, is_Dropdown=%r"
        data = (property.get_value(), property.get_description(), property.get_is_dropdown())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return property

    def delete(self, property):
        cursor = self._cnx.cursor()

        command = "DELETE FROM property WHERE PropertyID={}".format(property.get_id())


#todo umwandlungen in json?