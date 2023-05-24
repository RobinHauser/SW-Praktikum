"""
get: getting a list of all information objects of a profile

post: adding a new information object to a profile

delete: deleting an information object from a profile
"""

import json

from backend.src.server.bo import Blocklist
from backend.src.server.db import Mapper

class InformationMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        pass

    def find_by_id(self, profile_id):
        """
        Returns a list of all information objects assigned to the profile
        :param profile_id: the unique id of the profile
        :return: a list of all information objects. If there is no information, it will return an empty list.
        """
        result = []
        cursor = self._cnx.cursor()

        # Retrieve assigned infos by ProfileID
        command = "SELECT * FROM info_assignment WHERE ProfileID={}".format(profile_id)
        cursor.execute(command)
        assignments = cursor.fetchall()

        if assignments is not None:
            info_ids = [assignment[2] for assignment in assignments]

            #Retrieve infos by InformationID
            command2 = "SELECT * FROM information WHERE InformationID IN ({})".format(','.join(str(infid) for infid in info_ids))
            cursor.execute(command2)
            infos = cursor.fetchall()

            # Form infos into a json and add them to the list
            for info in infos:
                jsstr = f'{{"id": "{info[0]}", "property_id": "{info[1]}", "value": "{info[2]}"}}' #todo evtl auch properties rausholen und die values als string geben?
                infoJSON = json.loads(jsstr)
                result.append(infoJSON)

        cursor.close()
        return result

    def insert(self, profile_id, payload): #todo GEHÖRT WSL. ZU PROFILE MAPPER. insert info ist einfach neue info
        """
        Adding an information to a profile
        :param profile_id: the unique id of the profile we are adding infos to
        :param payload: the dic of the info to be added
        :return: the added info
        """
        cursor = self._cnx.cursor()

        profile = profile_id
        info = int(payload.get('id'))

        cursor.execute(f'INSERT INTO info_assignment (ProfileID, InformationID) VALUES ({profile}, {info})')

        self._cnx.commit()
        cursor.close()

        return payload

    def delete(self, profile_id, payload): #todo GEHÖRT WSL. ZU PROFILE MAPPER. delete info ist einfach info löschen
        """
        Removing an information from a profile
        :param profile_id: the unique id of the profile
        :param payload: the dic of the info that will be deleted
        :return: the removed info
        """
        cursor = self._cnx.cursor()

        profile = profile_id
        info = int(payload.get('id'))

        cursor.execute(f'DELETE FROM info_assignment WHERE ProfileID = {profile} AND InformationID = {info}')

        self._cnx.commit()
        cursor.close()

        return payload

        #todo es fehlt delete info und delete profile