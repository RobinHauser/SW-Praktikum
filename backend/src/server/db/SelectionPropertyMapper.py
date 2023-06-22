import json

from backend.src.server.bo.SelectionProperty import SelectionProperty
from backend.src.server.db import Mapper as Mapper

class SelectionPropertyMapper(Mapper.Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self):
        """
        finds all selection properties in the system
        :return: a list of all selection properties
        """
        result = []
        cursor = self._cnx.cursor()

        cursor.execute("SELECT * FROM property WHERE IsSelection = 1")
        tuples = cursor.fetchall()

        #Getting the main part of a selection property except the selections list
        for (id, name, is_selection, description) in tuples:
            sel_prop = SelectionProperty()
            sel_prop.set_id(id)
            sel_prop.set_name(name)
            sel_prop.set_is_selection(is_selection)
            sel_prop.set_description(description)

            #Retrieving property assignments
            command = "SELECT * FROM property_assignment WHERE PropertyID = {}".format(id)
            cursor.execute(command)
            assignments = cursor.fetchall()

            if assignments:
                value_ids = [assignment[0] for assignment in assignments]

                #Retrieving occupancies rows
                command2 = "SELECT * FROM occupancies WHERE ValueID IN ({})".format(
                    ','.join(str(v_id) for v_id in value_ids))
                cursor.execute(command2)
                values = cursor.fetchall()

                #Adding the occupancy value names to a list
                if values:
                    value_names = [val[1] for val in values]
                    # setting the list as sel_prop's selections attribute
                    # sel_prop.set_selections(value_names)

            result.append(sel_prop)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, property_id):
        """
        finds the selection property with the given property_id
        :param property_id: id of the selection property
        :return: selection property object of that id
        """
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT * FROM property WHERE IsSelection = 1 AND PropertyID={}".format(property_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, is_selection, description) = tuples[0]
            sel_prop = SelectionProperty()
            sel_prop.set_id(id)
            sel_prop.set_name(name)
            sel_prop.set_is_selection(is_selection)
            sel_prop.set_description(description)

            # Retrieving property assignments
            command = "SELECT * FROM property_assignment WHERE PropertyID = {}".format(property_id)
            cursor.execute(command)
            assignments = cursor.fetchall()

            if assignments:
                value_ids = [assignment[0] for assignment in assignments]

                # Retrieving occupancies rows
                command2 = "SELECT * FROM occupancies WHERE ValueID IN ({})".format(
                    ','.join(str(v_id) for v_id in value_ids))
                cursor.execute(command2)
                values = cursor.fetchall()

                # Adding the occupancy value names to a list
                if values:
                    value_names = [val[1] for val in values]
                    # sel_prop.set_selections(value_names)

            result = sel_prop

        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_name(self, name):
        """
        finds a selection property by its name
        :param name: name of the selection property
        :return: selection property object with given name
        """
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT * FROM property WHERE IsSelection = 1 AND Name LIKE '{}'".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, is_selection, description) = tuples[0]
            sel_prop = SelectionProperty()
            sel_prop.set_id(id)
            sel_prop.set_name(name)
            sel_prop.set_is_selection(is_selection)
            sel_prop.set_description(description)

            # Retrieving property assignments
            command = "SELECT * FROM property_assignment WHERE PropertyID = {}".format(sel_prop.get_id())
            cursor.execute(command)
            assignments = cursor.fetchall()

            if assignments:
                value_ids = [assignment[0] for assignment in assignments]

                # Retrieving occupancies rows
                command2 = "SELECT * FROM occupancies WHERE ValueID IN ({})".format(
                    ','.join(str(v_id) for v_id in value_ids))
                cursor.execute(command2)
                values = cursor.fetchall()

                # Adding the occupancy value names to a list
                if values:
                    value_names = [val[1] for val in values]
                    # sel_prop.set_selections(value_names)

            result = sel_prop

        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result


    def insert(self, sel_prop):
        """
        creates a new selection property
        :param sel_prop: selection property object
        :return: inserted selection property
        """
        cursor = self._cnx.cursor()

        # ID Handling with specified ID range
        cursor.execute("SELECT MAX(PropertyID) AS maxid FROM property")
        tuples = cursor.fetchall()

        for maxid in tuples:
            if maxid[0] is not None:
                if maxid[0]+1 > 7000:
                    raise ValueError("Reached maximum entities. Initializing not possible.") #todo catch error somewhere
                else:
                    sel_prop.set_id(maxid[0]+1)
            else:
                sel_prop.set_id(6001)

        command = "INSERT INTO property (PropertyID, Name, IsSelection, Description) VALUES (%s,%s,%s,%s)"
        data = (sel_prop.get_id(), sel_prop.get_name(), sel_prop.get_is_selection(), sel_prop.get_description())
        cursor.execute(command, data)

        # #INSERTING SELECTION OPTIONS
        # selections = sel_prop.get_selections()
        # for selection in selections:
        #     # ID Handling with specified ID range
        #     cursor.execute("SELECT MAX(ValueID) AS maxid FROM property_assignment")
        #     tuples = cursor.fetchall()
        #     max_id = 0
        #     for maxid in tuples:
        #         if maxid[0] is not None:
        #             if maxid[0] + 1 > 8000:
        #                 raise ValueError(
        #                     "Reached maximum entities. Initializing not possible.")  # todo catch error somewhere
        #             else:
        #                 max_id = maxid[0] + 1
        #         else:
        #             max_id = 7001
        #
        #     command3 = "INSERT INTO property_assignment (ValueID, PropertyID) VALUES (%s, %s)"
        #     data = (max_id, sel_prop.get_id())
        #     cursor.execute(command3, data)
        #
        #     command4 = "INSERT INTO occupancies (ValueID, Value) VALUES (%s, %s)"
        #     data = (max_id, selection)
        #     cursor.execute(command4, data)


        self._cnx.commit()
        cursor.close()

        return sel_prop


    def update(self, sel_prop):
        """
        updates given selection property
        :param sel_prop: selection property to be updated
        :return: updated selection property
        """
        cursor = self._cnx.cursor()

        command = "UPDATE property SET Name=%s, IsSelection=%s, Description=%s WHERE PropertyID=%s"
        data = (sel_prop.get_name(), sel_prop.get_is_selection(), sel_prop.get_description(), sel_prop.get_id())
        cursor.execute(command, data)

        # # UPDATING THE SELECTION OPTIONS
        # # Retrieving property assignments
        # command = "SELECT * FROM property_assignment WHERE PropertyID = {}".format(sel_prop.get_id())
        # cursor.execute(command)
        # assignments = cursor.fetchall()
        # current_selections = []
        #
        # if assignments:
        #     value_ids = [assignment[0] for assignment in assignments]
        #
        #     # Retrieving occupancies rows
        #     command2 = "SELECT * FROM occupancies WHERE ValueID IN ({})".format(
        #         ','.join(str(v_id) for v_id in value_ids))
        #     cursor.execute(command2)
        #     values = cursor.fetchall()
        #
        #     # Adding the occupancy value names to a list
        #     if values:
        #         current_selections = [val[1] for val in values]
        #
        # new_selections = sel_prop.get_selections()
        #
        # #ADDING SELECTION OPTIONS
        # for selection in new_selections:
        #     if selection not in current_selections:
        #
        #         # ID Handling with specified ID range
        #         cursor.execute("SELECT MAX(ValueID) AS maxid FROM property_assignment")
        #         tuples = cursor.fetchall()
        #         max_id = 0
        #         for maxid in tuples:
        #             if maxid[0] is not None:
        #                 if maxid[0] + 1 > 8000:
        #                     raise ValueError(
        #                         "Reached maximum entities. Initializing not possible.")  # todo catch error somewhere
        #                 else:
        #                     max_id = maxid[0] + 1
        #             else:
        #                 max_id = 7001
        #
        #         command3 = "INSERT INTO property_assignment (ValueID, PropertyID) VALUES (%s, %s)"
        #         data = (max_id, sel_prop.get_id())
        #         cursor.execute(command3, data)
        #
        #         command4 = "INSERT INTO occupancies (ValueID, Value) VALUES (%s, %s)"
        #         data = (max_id, selection)
        #         cursor.execute(command4, data)
        #
        # #DELETING SELECTION OPTIONS
        # #Retrieving list of ValueIDs assigned to the current selection property
        # command5 = "SELECT * FROM property_assignment WHERE PropertyID={}".format(sel_prop.get_id())
        # cursor.execute(command5)
        # tuples = cursor.fetchall()
        # if tuples:
        #     all_value_ids_of_prop = [tup[0] for tup in tuples]
        #
        #     for selection in current_selections:
        #         if selection not in new_selections:
        #
        #             #Retrieving the ValueID of the selection value
        #             command6 = "SELECT * FROM occupancies WHERE Value LIKE '{}' AND ValueID IN ({})".format(selection, ','.join(str(v_id) for v_id in all_value_ids_of_prop))
        #             cursor.execute(command6)
        #             value_ids = cursor.fetchone()
        #             if value_ids is not None:
        #                 value_id = value_ids[0]
        #
        #                 command7 = "DELETE FROM occupancies WHERE Value LIKE '{}' AND ValueID IN ({})".format(selection, ','.join(str(v_id) for v_id in all_value_ids_of_prop))
        #                 cursor.execute(command7)
        #
        #                 command8 = "DELETE FROM property_assignment WHERE ValueID = {}".format(value_id)
        #                 cursor.execute(command8)

        self._cnx.commit()
        cursor.close()

        return sel_prop


    def delete(self, sel_prop):
        """
        deletes given selection property
        :param sel_prop: selection property to be deleted
        :return: deleted selection property
        """
        cursor = self._cnx.cursor()

        # Retrieving list of ValueIDs assigned to the current selection property
        command5 = "SELECT * FROM property_assignment WHERE PropertyID={}".format(sel_prop.get_id())
        cursor.execute(command5)
        tuples = cursor.fetchall()
        if tuples:
            all_value_ids_of_prop = [tup[0] for tup in tuples]

            for value_id in all_value_ids_of_prop:

                # Retrieving the ValueID of the selection value
                # command = "SELECT * FROM occupancies WHERE Value LIKE '{}'".format(selection)
                # cursor.execute(command)
                # value_ids = cursor.fetchall()
                # if value_ids is not None:
                #     value_id = value_ids[0][0]

                command2 = "DELETE FROM occupancies WHERE ValueID = {}".format(value_id)
                cursor.execute(command2)

            command3 = "DELETE FROM property_assignment WHERE PropertyID = {}".format(sel_prop.get_id())
            cursor.execute(command3)

        command4 = "DELETE FROM property WHERE PropertyID={}".format(sel_prop.get_id())
        cursor.execute(command4)

        self._cnx.commit()
        cursor.close()

        return sel_prop

    def retrieve_selections(self, sel_prop):
        """
        returns all selectable options of a selection property.
        :param sel_prop: the given selection property
        :return: a dictionary with all selectable options of that selection property
        """
        result = []
        cursor = self._cnx.cursor()

        # Retrieving property assignments
        command = "SELECT * FROM property_assignment WHERE PropertyID = {}".format(sel_prop.get_id())
        cursor.execute(command)
        assignments = cursor.fetchall()

        if assignments:
            value_ids = [assignment[0] for assignment in assignments]

            # Retrieving occupancies rows
            command2 = "SELECT * FROM occupancies WHERE ValueID IN ({})".format(
                ','.join(str(v_id) for v_id in value_ids))
            cursor.execute(command2)
            values = cursor.fetchall()

            for value in values:
                jsstr = f'{{"valueID": "{value[0]}", "value": "{value[1]}"}}'
                value_json = json.loads(jsstr)
                result.append(value_json)

        self._cnx.commit()
        cursor.close()

        return result

    def add_selection(self, sel_prop, payload):
        """
        adds a selectable option to the given selection property
        :param sel_prop: the selection property we want to add an option to
        :param selection: the String of the option we add
        :return: the added selectable option
        """
        cursor = self._cnx.cursor()

        # ID Handling with specified ID range
        cursor.execute("SELECT MAX(ValueID) AS maxid FROM occupancies")
        tuples = cursor.fetchall()
        max_id = 0
        for maxid in tuples:
            if maxid[0] is not None:
                if maxid[0] + 1 > 8000:
                    raise ValueError(
                        "Reached maximum entities. Initializing not possible.")  # todo catch error somewhere
                else:
                    max_id = maxid[0] + 1
            else:
                max_id = 7001

        command2 = "INSERT INTO property_assignment (ValueID, PropertyID) VALUES (%s, %s)"
        data = (max_id, sel_prop.get_id())
        cursor.execute(command2, data)

        command = "INSERT INTO occupancies (ValueID, Value) VALUES (%s, %s)"
        data = (max_id, payload.get('value'))
        cursor.execute(command, data)



        self._cnx.commit()
        cursor.close()

        return payload
        # todo im frontend: sobald man eine neue option anlegt muss direkt danach der retrieve_selections befehl aufgerufen werden, damit die ValueID wieder geholt wird.

    def remove_selection(self, value_id):
        """
        removes the given selectable option
        :param value_id: id of the selectable option to be removed
        :return: removed value_id
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM information WHERE ValueID = {}".format(value_id)
        cursor.execute(command)

        command2 = "DELETE FROM occupancies WHERE ValueID = {}".format(value_id)
        cursor.execute(command2)

        command3 = "DELETE FROM property_assignment WHERE ValueID = {}".format(value_id)
        cursor.execute(command3)

        self._cnx.commit()
        cursor.close()

        return value_id
