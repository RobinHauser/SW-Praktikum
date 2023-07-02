from src.server.db import Mapper
from src.server.bo import Profile
from src.server.bo import Information
import json

Profile = Profile.Profile
Information = Information.Information

"""
This class manages operations on profile objects. 
The operations are the same for both search profiles and personal profiles. 
"""

class ProfileMapper(Mapper.Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        """
        Finds all profiles in the system
        :return: a list of all existing profiles, both search profiles and personal profiles
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * FROM profile")
        tuples = cursor.fetchall()

        for (profile_id, is_personal) in tuples:
            # Retrieving the user_id attribute for the profile object
            command = "SELECT * FROM profile_relation WHERE ProfileID={}".format(profile_id)
            cursor.execute(command)
            relations = cursor.fetchall()
            if relations:
                user_id = relations[0][1]

                profile = Profile()
                profile.set_id(profile_id)
                profile.set_user_id(user_id)
                profile.set_is_personal(is_personal)

                result.append(profile)

        self._cnx.commit()
        cursor.close()

        return result

    def find_all_personal(self):
        """
        Finds all personal profiles in the system
        :return: a list of all existing personal profiles in the system
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * FROM profile WHERE IsPersonal = 1")
        tuples = cursor.fetchall()

        for (profile_id, is_personal) in tuples:
            # Retrieving the user_id attribute for the profile object
            command = "SELECT * FROM profile_relation WHERE ProfileID={}".format(profile_id)
            cursor.execute(command)
            relations = cursor.fetchall()
            if relations:
                user_id = relations[0][1]

                profile = Profile()
                profile.set_id(profile_id)
                profile.set_user_id(user_id)
                profile.set_is_personal(is_personal)
                result.append(profile)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        """
        Returns the profile belonging to the given ID
        :param id: ID of the profile
        :return: profile belonging to the given ID
        """
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT * FROM profile WHERE ProfileID={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (profile_id, is_personal) = tuples[0]
            # Retrieving the user_id attribute for the profile object
            command = "SELECT * FROM profile_relation WHERE ProfileID={}".format(profile_id)
            cursor.execute(command)
            relations = cursor.fetchall()
            if relations:
                user_id = relations[0][1]

                profile = Profile()
                profile.set_id(profile_id)
                profile.set_user_id(user_id)
                profile.set_is_personal(is_personal)
                result = profile
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_personal_profile_of_owner(self, owner):
        """
        Returns the personal profile of the given user
        :param owner: the user we want to get the personal profile from
        :return: personal profile of the user
        """
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT * FROM profile_relation WHERE UserID={}".format(owner.get_user_id())
        cursor.execute(command)
        relations = cursor.fetchall()

        if relations:
            profile_ids = [rel[0] for rel in relations]

            # Retrieve profiles by ProfileID
            command2 = "SELECT * FROM profile WHERE IsPersonal = 1 AND ProfileID IN ({})".format(
                ','.join(str(p_id) for p_id in profile_ids))
            cursor.execute(command2)
            tuples = cursor.fetchall()

            try:
                (profile_id, is_personal) = tuples[0]
                profile = Profile()
                profile.set_id(profile_id)
                profile.set_user_id(owner.get_user_id())
                profile.set_is_personal(is_personal)
                result = profile
            except IndexError:
                result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_search_profiles_of_owner(self, owner):
        """
        Returns all search profiles belonging to a given user
        :param owner: the user we want to get the search profiles from
        :return: a list of all search profiles belonging to the user
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM profile_relation WHERE UserID={}".format(owner.get_user_id())
        cursor.execute(command)
        relations = cursor.fetchall()

        if relations:
            profile_ids = [rel[0] for rel in relations]

            # Retrieve profiles by ProfileID
            command2 = "SELECT * FROM profile WHERE IsPersonal = 0 AND ProfileID IN ({})".format(
                ','.join(str(p_id) for p_id in profile_ids))
            cursor.execute(command2)
            tuples = cursor.fetchall()

            for (profile_id, is_personal) in tuples:
                profile = Profile()
                profile.set_id(profile_id)
                profile.set_user_id(owner.get_user_id())
                profile.set_is_personal(is_personal)
                result.append(profile)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_information(self, information):
        """
        Returns a list of all profiles that have the given info
        :param information: information that we filter by
        :return: a list of all profiles with that information
        during development, we planned to use this function to calculate the similarity measure.
        however, we used another approach, leaving this function unused.
        """
        result = []
        cursor = self._cnx.cursor()

        # Retrieve all profile IDs with the info
        command = "SELECT * FROM information WHERE InformationID={}".format(information.get_id())
        cursor.execute(command)
        infos = cursor.fetchall()

        if infos:
            profile_ids = [info[1] for info in infos]
            #profile_ids = list(set(profile_ids)) #Removing duplicate entries

            # Retrieve Profiles by ProfileID
            command2 = "SELECT * FROM profile WHERE ProfileID IN ({})".format(
                ','.join(str(p_id) for p_id in profile_ids))
            cursor.execute(command2)
            tuples = cursor.fetchall()

            for (profile_id, is_personal) in tuples:
                #Retrieving the user_id attribute for the profile object
                command = "SELECT * FROM profile_relation WHERE ProfileID={}".format(profile_id)
                cursor.execute(command)
                relations = cursor.fetchall()
                if relations:
                    user_id = relations[0][1]

                    profile = Profile()
                    profile.set_id(profile_id)
                    profile.set_user_id(user_id)
                    profile.set_is_personal(is_personal)
                    result.append(profile)

            self._cnx.commit()
            cursor.close()

            return result


    def insert(self, profile):
        """
        Inserts a new profile in the system
        :param profile: profile to be inserted
        :return: returns the inserted profile
        """
        cursor = self._cnx.cursor()

        #ID Handling with specified ID range
        cursor.execute("SELECT MAX(ProfileID) AS maxid FROM profile")
        tuples = cursor.fetchall()

        for maxid in tuples:
            if maxid[0] is not None:
                profile.set_id(maxid[0]+1)
            else:
                profile.set_id(4001)

        command = "INSERT INTO profile (ProfileID, IsPersonal) VALUES (%s,%s)"
        data = (profile.get_id(), profile.get_is_personal())
        cursor.execute(command, data)

        command2 = "INSERT INTO profile_relation (ProfileID, UserID) VALUES (%s, %s)"
        data2 = (profile.get_id(), profile.get_user_id())
        cursor.execute(command2, data2)

        self._cnx.commit()
        cursor.close()

        return profile

    def update(self, profile):
        """
        since our profiles have only the attributes user_id and is_personal, we decided there is nothing
        a profile could be updated with. that is why we left this function empty.
        """
        pass

    def delete(self, profile):
        """
        Deleting a profile
        :param profile: Profile to be deleted
        :return: deleted profile
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM profile_relation WHERE ProfileID={}".format(profile.get_id())
        cursor.execute(command)

        command2 = "DELETE FROM profile WHERE ProfileID={}".format(profile.get_id())
        cursor.execute(command2)

        self._cnx.commit()
        cursor.close()

        return profile

