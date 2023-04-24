from server.bo import BusinessObject as bo


class Profile(bo):
    def __init__(self):
        super().__init__()
        self.__information = ""
        self.personal_profile = bool

    def display_information(self):
        return self.__information

    def get_personal_information(self):
        return self.__information