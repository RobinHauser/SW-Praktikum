from server.bo import BusinessObject as bo


class User(bo.BusinessObject):
    def __init__(self, id):
        super().__init__()
        self.__first_name = ""
        self.__last_name = ""
        self.__email = ""
        self.__g_id = int
        self.__date_of_birth = ""
        self.__owner = id

    def get_first_name(self):
        return self.__first_name

    def set_first_name(self, first_name):
        self.__first_name = first_name

    def get_last_name(self):
        return self.__last_name

    def set_last_name(self, last_name):
        self.__last_name = last_name

    def get_email(self):
        return self.__email

    def set_email(self, email):
        self.__email = email

    def get_g_id(self):
        return self.__g_id

    def set_g_id(self, g_id):
        self.__g_id = g_id

    def get_date_of_birth(self):
        return self.__date_of_birth

    def set_date_of_birth(self, date_of_birth):
        self.__date_of_birth = date_of_birth

    def get_owner(self):
        return self.__owner

    def set_owner(self, owner):
        self.__owner = owner
