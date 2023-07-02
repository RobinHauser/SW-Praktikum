

import json

from src.server.bo.Information import Information
from src.server.db.Mapper import Mapper


"""
This class manages operations on information objects. 
"""
class InformationMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        """
        Finds all existing information objects
        :return: a list of all existing information objects
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM information"
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, profile_id, value_id) in tuples:
            information = Information()
            information.set_id(id)
            information.set_profile_id(profile_id)
            information.set_value_id(value_id)
            result.append(information)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        """
        Finds an information object by its ID
        :return: information object with the given ID
        """
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT * FROM information WHERE InformationID={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (info_id, profile_id, value_id) = tuples[0]
            info = Information()
            info.set_id(id)
            info.set_profile_id(profile_id)
            info.set_value_id(value_id)
            result = info
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_property(self, property):
        """
        Returns all information objects assigned to the given property
        :param property: property object of the needed infos
        :return: a list of information objects assigned to the property
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM property_assignment WHERE PropertyID={}".format(property.get_id())
        cursor.execute(command)
        assignments = cursor.fetchall()

        if assignments:
            value_ids = [ass[0] for ass in assignments]

            # Retrieve Information by ValueID
            command2 = "SELECT * FROM information WHERE ValueID IN ({})".format(
                ','.join(str(v_id) for v_id in value_ids))
            cursor.execute(command2)
            tuples = cursor.fetchall()

            for (id, profile_id, value_id) in tuples:
                information = Information()
                information.set_id(id)
                information.set_profile_id(profile_id)
                information.set_value_id(value_id)
                result.append(information)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_profile(self, profile):
        """
        Returns a list of all information objects assigned to the profile
        :param profile: the unique id of the profile
        :return: a list of all information objects assigned to the profile. If there is no information, it will return an empty list.
        """
        result = []
        cursor = self._cnx.cursor()

        # Retrieve assigned infos by ProfileID
        command = "SELECT * FROM information WHERE ProfileID={}".format(profile.get_id())
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, profile_id, value_id) in tuples:
            info = Information()
            info.set_id(id)
            info.set_profile_id(profile_id)
            info.set_value_id(value_id)
            result.append(info)

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, info):
        """
        Inserts a new information object in the system
        :param info: new information object
        :return: inserted information object
        """
        cursor = self._cnx.cursor()
        # ID Handling with specified ID range
        cursor.execute("SELECT MAX(InformationID) AS maxid FROM information")
        tuples = cursor.fetchall()

        for maxid in tuples:
            if maxid[0] is not None:
                info.set_id(maxid[0] + 1)
            else:
                info.set_id(5001)

        # check if an info of the new info's property is already created for the current user
        # first, get all value_ids of the infos assigned to the current profile
        command = f'SELECT * FROM information WHERE ProfileID={info.get_profile_id()}'
        cursor.execute(command)
        infos_of_profile = cursor.fetchall()
        value_ids_of_profile = [inf[2] for inf in infos_of_profile]

        # get the property type of each info (or rather of each value_id)
        props_of_profile = []
        for v_id in value_ids_of_profile:
            command2 = "SELECT * FROM property_assignment WHERE ValueID = {}".format(v_id)
            cursor.execute(command2)
            assignment = cursor.fetchone()

            command3 = "SELECT * FROM property WHERE PropertyID = {}".format(assignment[1])
            cursor.execute(command3)
            prop_profile = cursor.fetchone()[0]
            props_of_profile.append(prop_profile)

        # get the property type of the new info we want to create
        command4 = "SELECT * FROM property_assignment WHERE ValueID = {}".format(info.get_value_id())
        cursor.execute(command4)
        assignment = cursor.fetchone()

        command5 = "SELECT * FROM property WHERE PropertyID = {}".format(assignment[1])
        cursor.execute(command5)
        prop = cursor.fetchone()[0]

        # if you try to create an info of a certain property type and the current profile already has an info of
        # that property type, you get an IndexError. This accomplishes that you can only add one info object of a certain
        # property per profile.
        if prop in props_of_profile:
            return IndexError


        command = "INSERT INTO information (InformationID, ProfileID, ValueID) VALUES (%s,%s,%s)"
        data = (info.get_id(), info.get_profile_id(), info.get_value_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return info

    def update(self, info, payload):
        """
        Updating information object
        :param info: information object to be updated
        :return: updated information object
        """
        cursor = self._cnx.cursor()
        command = "UPDATE information SET ProfileID=%s, ValueID=%s WHERE InformationID = %s"
        data = (info.get_profile_id(), payload.get('valueID'), info.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return payload

    def delete(self, info):
        """
        Deleting information object
        :param info: information object to be deleted
        :return: deleted information object
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM information WHERE InformationID={}".format(info.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

        return info


    def get_content_of_info(self, info):
        """
        gets the value of an info object
        :param info: info we want to get the content from
        :return: a dictionary (json) with the content of the information object
        """
        cursor = self._cnx.cursor()
        content_json = {}

        # Retrieving information
        command = "SELECT * FROM information WHERE InformationID = {}".format(info.get_id())
        cursor.execute(command)
        information = cursor.fetchone()

        if information:
            value_id = information[2]

            # Retrieving occupancies rows
            command2 = "SELECT * FROM occupancies WHERE ValueID = {}".format(value_id)
            cursor.execute(command2)
            content = cursor.fetchone()

            command3 = "SELECT * FROM property_assignment WHERE ValueID = {}".format(value_id)
            cursor.execute(command3)
            prop_ass_tuple = cursor.fetchone()
            if prop_ass_tuple:
                prop_id = prop_ass_tuple[1]
                command4 = "SELECT * FROM property WHERE PropertyID = {}".format(prop_id)
                cursor.execute(command4)
                prop_tuple = cursor.fetchone()
                prop = prop_tuple[1]
                is_select = prop_tuple[2]
                prop_description = prop_tuple[3]

                if content:
                    jsstr = f'{{"valueID": "{content[0]}", "value": "{content[1]}", "property": "{prop}", "isSelect": "{is_select}", "propDescription": "{prop_description}",' \
                            f' "propID": "{prop_id}", "informationID": "{information[0]}"}}'
                    content_json = json.loads(jsstr)

        self._cnx.commit()
        cursor.close()

        return content_json

