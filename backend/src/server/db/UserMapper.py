from backend.src.server.Administration import Administration
from backend.src.server.bo.User import User
from backend.src.server.db.Mapper import Mapper


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
        command = f'SELECT * FROM user WHERE Email = "{email}"'
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

        # insert the new User
        cursor = self._cnx.cursor()
        insert_command = "INSERT INTO user (email, displayname, avatarurl) VALUES (%s, %s, %s)"
        data = (payload['email'], payload['displayname'], payload['ProfileIMGURL'])
        cursor.execute(insert_command, data)
        self._cnx.commit()

        # get the user which is inserted
        email = payload['email']
        select_command = f"SELECT * FROM user WHERE email = '{email}'"
        cursor.execute(select_command)
        user_data = cursor.fetchone()

        if not user_data:
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


        adm = Administration()
        adm.create_personal_profile_for_user(user)

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

        # TODO Delete related user content with profile context
        # Delete searchprofiles of user
        adm = Administration()
        search_profiles = adm.get_search_profiles_of_user(user)
        for i in search_profiles:
            adm.delete_profile(i)

        # Delete the personal profile if the user
        personal_profiles = adm.get_personal_profile_of_user(user)
        for i in personal_profiles:
            adm.delete_profile(i)


        # Delete the user
        command = "DELETE FROM user WHERE UserID={}".format(user.get_user_id())
        cursor.execute(command)
        self._cnx.commit()
        cursor.close()

        return user

    def __get_user_related_id(self, cursor, table, id_column, user_column, user_id):
        command = f'SELECT {id_column} FROM {table} WHERE {user_column} = {user_id}'
        cursor.execute(command)
        return cursor.fetchone()[0]

    def __delete_content(self, cursor, table, id_column, content_id):
        command = f'DELETE FROM {table} WHERE {id_column} = {content_id}'
        cursor.execute(command)
        self._cnx.commit()

    def __check_user_dependencies_in_chat_context(self, user_id):
        cursor = self._cnx.cursor()

        # Check for chat relations
        command_check_chatrelation = f"SELECT * FROM chatrelation WHERE UserID = {user_id} OR UserID2 = {user_id}"
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
        command_get_ChatID = f"SELECT ChatID FROM chatrelation WHERE UserID = {user_id} OR UserID2 = {user_id}" # TODO Vielleicht error weil user2 nicht mehr gibt
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
        command_delete_chatrelations = f"DELETE FROM chatrelation WHERE UserID = {user_id} OR UserID2 = {user_id}"
        cursor.execute(command_delete_chatrelations)

        # Delete Messages of user
        command_delete_messages = f"DELETE FROM message WHERE Sender = {user_id}"
        cursor.execute(command_delete_messages)

        self._cnx.commit()
        cursor.close()
