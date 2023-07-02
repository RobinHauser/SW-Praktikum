import json

from src.server.bo.TextProperty import TextProperty
from src.server.db import Mapper as Mapper
from src.server.bo.Information import Information

"""
This class manages operations on text properties. 
Except for a few nuances, they are very similar to selection property operations. 
This class also manages operations on text entries for the respective text property. 
"""

class TextPropertyMapper(Mapper.Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self):
        """
        finds all text properties in the system
        :return: a list of all text properties
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * FROM property WHERE IsSelection = 0")
        tuples = cursor.fetchall()

        for (id, name, is_selection, description) in tuples:
            text_prop = TextProperty()
            text_prop.set_id(id)
            text_prop.set_name(name)
            text_prop.set_is_selection(is_selection)
            text_prop.set_description(description)
            result.append(text_prop)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        """
        finds the text property with the given property_id
        :param id: id of the text property
        :return: text property object of that id
        """

        result = None
        cursor = self._cnx.cursor()
        command = "SELECT * FROM property WHERE IsSelection = 0 AND PropertyID={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, is_selection, description) = tuples[0]
            text_prop = TextProperty()
            text_prop.set_id(id)
            text_prop.set_name(name)
            text_prop.set_is_selection(is_selection)
            text_prop.set_description(description)
            result = text_prop
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_name(self, name):
        """
        finds a text property by its name
        :param name: name of the text property
        :return: text property object with given name
        """
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT * FROM property WHERE IsSelection = 0 AND Name LIKE '{}'".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, is_selection, description) = tuples[0]
            text_prop = TextProperty()
            text_prop.set_id(id)
            text_prop.set_name(name)
            text_prop.set_is_selection(is_selection)
            text_prop.set_description(description)
            result = text_prop
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, text_prop):
        """
        creates a new text property
        :param text_prop: text property object
        :return: inserted text property
        """
        cursor = self._cnx.cursor()

        # ID Handling with specified ID range
        cursor.execute("SELECT MAX(PropertyID) AS maxid FROM property")
        tuples = cursor.fetchall()

        for maxid in tuples:
            if maxid[0] is not None:
                text_prop.set_id(maxid[0] + 1)
            else:
                text_prop.set_id(6001)

        command = "INSERT INTO property (PropertyID, Name, IsSelection, Description) VALUES (%s,%s,%s,%s)"
        data = (text_prop.get_id(), text_prop.get_name(), text_prop.get_is_selection(), text_prop.get_description())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return text_prop

    def update(self, text_prop):
        """
        updates given text property
        :param text_prop: text property to be updated
        :return: updated text property
        Updatable are the name and the description.
        """
        cursor = self._cnx.cursor()

        command = "UPDATE property SET Name=%s, Description=%s WHERE PropertyID=%s"
        data = (text_prop.get_name(), text_prop.get_description(), text_prop.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return text_prop

    def delete(self, text_prop):
        """
        deletes given text property
        :param text_prop: text property to be deleted
        :return: deleted text property
        """
        cursor = self._cnx.cursor()

        # DELETING ALL TEXT ENTRIES OF THAT TEXT PROPERTY
        # Retrieving property assignments
        command = "SELECT * FROM property_assignment WHERE PropertyID = {}".format(text_prop.get_id())
        cursor.execute(command)
        assignments = cursor.fetchall()
        entries = []

        if assignments:
            value_ids = [assignment[0] for assignment in assignments]

            # Retrieving occupancies rows
            command2 = "SELECT * FROM occupancies WHERE ValueID IN ({})".format(
                ','.join(str(v_id) for v_id in value_ids))
            cursor.execute(command2)
            values = cursor.fetchall()

            if values:
                entries = [val[1] for val in values]

        for entry in entries:
            command3 = "DELETE FROM occupancies WHERE Value LIKE '{}'".format(entry)
            cursor.execute(command3)

        command4 = "DELETE FROM property_assignment WHERE PropertyID = {}".format(text_prop.get_id())
        cursor.execute(command4)

        command5 = "DELETE FROM property WHERE PropertyID={}".format(text_prop.get_id())
        cursor.execute(command5)

        self._cnx.commit()
        cursor.close()

        return text_prop

    def insert_entry(self, text_prop, payload):
        """
        inserts a new text entry into occupancy & property_assignment
        :param text_prop: text property the entry will belong to
        :param payload: entered text by the user
        :return: id of the created entry
        """
        cursor = self._cnx.cursor()

        # ID Handling with specified ID range
        cursor.execute("SELECT MAX(ValueID) AS maxid FROM property_assignment")
        tuples = cursor.fetchall()
        max_id = 0
        for maxid in tuples:
            if maxid[0] is not None:
                max_id = maxid[0] + 1
            else:
                max_id = 7001

        command = "INSERT INTO property_assignment (ValueID, PropertyID) VALUES (%s, %s)"
        data = (max_id, text_prop.get_id())
        cursor.execute(command, data)

        entry = payload.get('entry')
        command2 = "INSERT INTO occupancies (ValueID, Value) VALUES (%s, %s)"
        data = (max_id, entry)
        cursor.execute(command2, data)

        jsstr = f'{{"valueID": "{max_id}", "value": "{entry}"}}'
        value_json = json.loads(jsstr)

        self._cnx.commit()
        cursor.close()

        return value_json
        # A json with the valueID and value of the inserted entry gets returned.
        # This is necessary for the creation of an information object that must reference this new entry.

    def update_entry(self, value_id, payload):
        """
        updates the content of a specific text entry
        :param value_id: id of the text entry we want to update
        :param payload: changed text entry
        :return: changed text entry
        """
        cursor = self._cnx.cursor()

        command = "UPDATE occupancies SET Value=%s WHERE ValueID=%s"
        data = (payload.get('entry'), value_id)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return payload

