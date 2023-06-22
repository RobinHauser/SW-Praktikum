from server.db import Mapper
from server.bo import Profile
from server.bo import Information
import json

Profile = Profile.Profile
Information = Information.Information

class ProfileMapper(Mapper.Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        """
        Finds all profiles in the system
        :return: all existing profiles
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
        :return: all existing personal profiles
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
        :param owner: user the personal profile belongs to
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
        :param owner: user the search profiles belong to
        :return: all search profiles belonging to the user
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
                if maxid[0]+1 > 5000:
                    raise ValueError("Reached maximum entities. Initializing not possible.") #todo catch error somewhere
                else:
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
        # cursor = self._cnx.cursor()
        #
        # command = "UPDATE profile SET ProfileID=%s, UserID=%s, IsPersonal=%s WHERE ProfileID=%s"
        # data = (profile.get_id(), profile.get_id())
        # cursor.execute(command, data)
        #
        # self._cnx.commit()
        # cursor.close()
        #
        # return profile
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





    # def add_info(self, profile, info): #todo evtl überarbeiten: Unterschied, ob Selection oder Text?
    #     """
    #     Adding an information to a profile
    #     :param profile: the profile we are adding infos to
    #     :param info: the info to be added
    #     :return: the added info
    #     """
    #     cursor = self._cnx.cursor()
    #
    #
    #     command = "INSERT INTO information (ProfileID, ValueID) VALUES ({}, {})".format(profile.get_id(), info.get_id())
    #     cursor.execute(command)
    #
    #     self._cnx.commit()
    #     cursor.close()
    #
    #     return info

    # def remove_info(self, profile, info):
    #     """
    #     Removing an information from a profile
    #     :param profile: the profile we are deleting an info from
    #     :param info: the info that will be deleted
    #     :return: the removed info
    #     """
    #     cursor = self._cnx.cursor()
    #
    #     command = "DELETE FROM info_assignment WHERE ProfileID = {} AND InformationID = {}".format(profile.get_id(), info.get_id())
    #     cursor.execute(command)
    #
    #     self._cnx.commit()
    #     cursor.close()
    #
    #     return info

    # def update_info(self, profile, assignment):
    #     """
    #     Updating / changing an information object belonging to the given profile
    #     :param profile:
    #     :param assignment:
    #     :return:
    #     """
    #     #todo
    #     pass