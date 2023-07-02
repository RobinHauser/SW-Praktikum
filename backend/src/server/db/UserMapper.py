from src.server.bo.Profile import Profile
from src.server.bo.User import User
from src.server.db.InformationMapper import InformationMapper
from src.server.db.Mapper import Mapper
from src.server.db.ProfileMapper import ProfileMapper


class UserMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self):
        """
        Get a list of all users
        :return: a list of all users
        """
        result = []
        cursor = self._cnx.cursor()

        cursor.execute("SELECT * FROM user")
        users = cursor.fetchall()

        # return empty list if no users where found
        if not users:
            return []

        for user_from_list in users:
            try:
                user = User()
                user.set_user_id(user_from_list[0])
                user.set_email(user_from_list[1])
                user.set_displayname(user_from_list[2])
                user.set_avatarurl(user_from_list[3])
                result.append(user)
            except IndexError:
                result = None




        self._cnx.commit()
        cursor.close()

        return result

    def find_all_by_id(self, id):
        """
        Returns a list of all other users a user(with a user_id) has blocked
        :param user_id: the unique id of the user
        :return: a sorted list of users
        """
        result = []
        cursor = self._cnx.cursor()
        command = f'SELECT * FROM user'
        cursor.execute(command)
        users = cursor.fetchall()

        if not users:
            return []

        for user_from_list in users:
            try:
                user = User()
                user.set_user_id(user_from_list[0])
                user.set_email(user_from_list[1])
                user.set_displayname(user_from_list[2])
                user.set_avatarurl(user_from_list[3])
                result.append(user)
            except IndexError:
                result = None

        for user in result:
            if int(user.get_user_id()) == int(id):
                result.remove(user)

        for blocklist in result:
            command3 = f'SELECT * FROM blocklist WHERE UserID={blocklist.get_user_id()}' # Iterates of all Users
            cursor.execute(command3)
            v3 = cursor.fetchall()

            if len(v3) != 0:
                command4 = f'SELECT * FROM block WHERE BlocklistID= {v3[0][0]} AND BlockedUserID = {id}' # Check if unique user is blocked by someone
                cursor.execute(command4)
                v4 = cursor.fetchall()
                if len(v4) is not 0:
                    for user in v4:
                        result.remove(blocklist)      # Removes user from result if blocked

        command = f'SELECT * FROM blocklist WHERE UserID={id}'  # Get blocklist of unique user
        cursor.execute(command)
        v = cursor.fetchall()
        if v:
            command2 = f'SELECT * FROM block WHERE BlocklistID= {v[0][0]}'      # Check which users are blocked by unique user
            cursor.execute(command2)
            v2 = cursor.fetchall()
            if len(v2) is not 0:
                result1 = result.copy()
                for user in result1:
                    for blocklist in v2:
                        if int(user.get_user_id()) == int(blocklist[2]):
                            result.remove(user)                            # Removes all blocked users of unique user from result

        self._cnx.commit()
        cursor.close()

        return result


    def find_by_id(self, id):
        """
        Get user by id
        :param email: the email of the user we want to find
        :return: the found user
        """
        cursor = self._cnx.cursor()
        command = f'SELECT * FROM user WHERE UserID = {id}'
        cursor.execute(command)
        tuples = cursor.fetchone()

        # return empty list if user with given user_id does not exist
        if tuples is None:
            return []

        try:
            user = User()
            user.set_user_id(tuples[0])
            user.set_email(tuples[1])
            user.set_displayname(tuples[2])
            user.set_avatarurl(tuples[3])
            result = user
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_name(self, name):
        pass

    def find_by_email(self, email):
        """
        Get user by email
        :param email: the email of the user we want to find
        :return: the found user
        """
        cursor = self._cnx.cursor()
        command = f"SELECT * FROM user WHERE Email = '{email}'"
        cursor.execute(command)
        tuples = cursor.fetchone()

        # return empty list if user with given user_id does not exist
        if tuples is None:
            return []

        try:
            user = User()
            user.set_user_id(tuples[0])
            user.set_email(tuples[1])
            user.set_displayname(tuples[2])
            user.set_avatarurl(tuples[3])
            result = user
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, payload):
        """
        This is creating a new user and also with all the related content
        :param payload: the user which is going to be created
        :return: the created user
        """

        # Check if the email already exists
        email = payload['email']
        cursor = self._cnx.cursor()
        command = (f"SELECT * FROM user WHERE Email = '{email}'")
        cursor.execute(command)
        email_data = cursor.fetchone()

        if email_data is not None:
            command_2 = (f"SELECT * FROM user WHERE Email = '{email}'")
            cursor.execute(command_2)
            user_data = cursor.fetchall()
            user = User()
            user.set_user_id(user_data[0][0])
            user.set_email(user_data[0][1])
            user.set_displayname(user_data[0][2])
            user.set_avatarurl(user_data[0][3])
            cursor.close()
            return user


        # Insert the new User
        insert_command = "INSERT INTO user (email, displayname, avatarurl) VALUES (%s, %s, %s)"
        data = (email, payload['displayname'], payload['ProfileIMGURL'])
        cursor.execute(insert_command, data)
        self._cnx.commit()

        # Get the inserted user
        select_command = f"SELECT * FROM user WHERE email = '{email}'"
        cursor.execute(select_command)
        user_data = cursor.fetchone()

        if not user_data:
            cursor.close()
            return None

        user = User()
        user.set_user_id(user_data[0])
        user.set_email(user_data[1])
        user.set_displayname(user_data[2])
        user.set_avatarurl(user_data[3])

        # Add content related to the user in Bookmarklist context
        insert_user_to_bookmarklist_command = f'INSERT INTO bookmarklist (UserID) VALUES ({user.get_user_id()})'
        cursor.execute(insert_user_to_bookmarklist_command)
        self._cnx.commit()

        # Add content related to the user in Blocklist context
        insert_user_to_blocklist_command = f'INSERT INTO blocklist (UserID) VALUES ({user.get_user_id()})'
        cursor.execute(insert_user_to_blocklist_command)
        self._cnx.commit()

        # Add content related to the user in Viewedlist context
        insert_user_to_viewedlist_command = f'INSERT INTO viewedlist (UserID) VALUES ({user.get_user_id()})'
        cursor.execute(insert_user_to_viewedlist_command)
        self._cnx.commit()

        # add content related to profile
        self.__create_personal_profile_for_user(user)

        cursor.close()

        return user

    def update(self, user):
        """
        Updating the user
        :param user: the updated user
        :return: the updated user if the requests is successful
        """
        cursor = self._cnx.cursor()

        command = "UPDATE user SET Email=%s, Displayname=%s, AvatarURL=%s WHERE UserID=%s"
        data = (user.get_email(), user.get_displayname(), user.get_avatarurl(), user.get_user_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return user

    def delete(self, id, user):
        """
        Delete the user. Before the user can be deleted, it must be deleting all relating Content of the user
        :param id: The user_id of the user which is going to be deleted
        :param user: The user which should be deleted
        :return: The is which was deleted
        """
        cursor = self._cnx.cursor()

        # Delete content related to the user in Bookmarklist context
        bookmarklist_id = self.__get_user_related_id(cursor, 'bookmarklist', 'BookmarklistID', 'UserID', id)
        self.__delete_content(cursor, 'bookmark', 'BookmarklistID', bookmarklist_id)
        self.__delete_content(cursor, 'bookmark', 'BookmarkedUserID', id)
        self.__delete_content(cursor, 'bookmarklist', 'BookmarklistID', bookmarklist_id)

        # Delete content related to the user in Blocklist context
        blocklist_id = self.__get_user_related_id(cursor, 'blocklist', 'BlocklistID', 'UserID', id)
        self.__delete_content(cursor, 'block', 'BlocklistID', blocklist_id)
        self.__delete_content(cursor, 'block', 'BlockedUserID', id)
        self.__delete_content(cursor, 'blocklist', 'BlocklistID', blocklist_id)

        # Delete content related to the user in View context
        viewedlist_id = self.__get_user_related_id(cursor, 'viewedlist', 'ViewedListID', 'UserID', id)
        self.__delete_content(cursor, 'view', 'ViewedListID', viewedlist_id)
        self.__delete_content(cursor, 'view', 'UserID', id)
        self.__delete_content(cursor, 'viewedlist', 'ViewedListID', viewedlist_id)

        # Delete content related to the user in chatting context
        if self.__check_user_dependencies_in_chat_context(id):
            self.__delete_user_chat_content(id)

        search_profiles = self.get_search_profiles_of_user(user)
        for i in search_profiles:
            self.delete_profile(i)

        personal_profile = self.get_personal_profile_of_user(user)
        self.delete_profile(personal_profile)

        # Delete the user
        command = "DELETE FROM user WHERE UserID={}".format(user.get_user_id())
        cursor.execute(command)
        self._cnx.commit()
        cursor.close()

        return user

    def __get_user_related_id(self, cursor, table, id_column, user_column, user_id):
        command = f'SELECT {id_column} FROM {table} WHERE {user_column} = {user_id}'
        cursor.execute(command)
        returned_value = cursor.fetchone()[0]
        return returned_value

    def __delete_content(self, cursor, table, id_column, content_id):
        command = f'DELETE FROM {table} WHERE {id_column} = {content_id}'
        cursor.execute(command)
        self._cnx.commit()

    def __check_user_dependencies_in_chat_context(self, user_id):
        cursor = self._cnx.cursor()

        # Check for chat relations
        command_check_chatrelation = f"SELECT * FROM chatrelation WHERE UserID = {user_id} OR UserRelationToChatID = {user_id}"
        cursor.execute(command_check_chatrelation)
        chatrelation_tuples = cursor.fetchall()

        # Check for message relations
        command_check_messages = f"SELECT * FROM message WHERE Sender = {user_id}"
        cursor.execute(command_check_messages)
        messages_tuples = cursor.fetchall()

        cursor.close()

        return len(chatrelation_tuples) > 0 or len(messages_tuples) > 0

    def __delete_user_chat_content(self, user_id):
        cursor = self._cnx.cursor()

        # Get related ChatIDs of user
        command_get_ChatID = f"SELECT ChatID FROM chatrelation WHERE UserID = {user_id} OR UserRelationToChatID = {user_id}"
        cursor.execute(command_get_ChatID)
        ChatID_tuples = cursor.fetchall()

        # Get related MessageIDs of user
        command_get_MessageID = f"SELECT MessageID FROM message WHERE Sender = {user_id}"
        cursor.execute(command_get_MessageID)
        MessageID_tuples = cursor.fetchall()

        # Delete chatcontainer rows related to ChatIDs and MessageIDs of the user
        command_delete_chatcontainer = f"DELETE FROM chatcontainer WHERE ChatID IN ({','.join(str(cid[0]) for cid in ChatID_tuples)}) OR MessageID IN ({','.join(str(mid[0]) for mid in MessageID_tuples)})"
        cursor.execute(command_delete_chatcontainer)

        # Delete chatrelations of user
        command_delete_chatrelations = f"DELETE FROM chatrelation WHERE UserID = {user_id} OR UserRelationToChatID = {user_id}"
        cursor.execute(command_delete_chatrelations)

        # Delete Messages of user
        command_delete_messages = f"DELETE FROM message WHERE Sender = {user_id}"
        cursor.execute(command_delete_messages)

        self._cnx.commit()
        cursor.close()

    def __create_personal_profile_for_user(self, user):
            mapper = ProfileMapper()
            user_id = user.get_user_id()
            profile = Profile()
            profile.set_user_id(user_id)
            profile.set_is_personal(1)
            return mapper.insert(profile)

    def get_search_profiles_of_user(self, user):
        mapper = ProfileMapper()
        if user is not None:
            return mapper.find_search_profiles_of_owner(user)
        else:
            return None

    def get_personal_profile_of_user(self, user):
        mapper = ProfileMapper()
        if user is not None:
            return mapper.find_personal_profile_of_owner(user)
        else:
            return None

    def get_infos_from_profile(self, profile):
        mapper = InformationMapper()
        if profile is not None:
            return mapper.find_by_profile(profile)
        else:
            return None

    def delete_info(self, info):
        mapper = InformationMapper()
        if info is not None:
            return mapper.delete(info)

    def delete_profile(self, profile):
        mapper = ProfileMapper()
        if profile is not None:
            infos = self.get_infos_from_profile(profile)
            # if infos is not None:
            for info in infos:
                self.delete_info(info)

            return mapper.delete(profile)
        else:
            return None