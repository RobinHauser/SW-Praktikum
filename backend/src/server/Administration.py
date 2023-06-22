from backend.src.server.bo.BusinessObject import BusinessObject
from backend.src.server.bo.Profile import Profile
from backend.src.server.bo.User import User
from backend.src.server.bo.Property import Property
from backend.src.server.bo.SelectionProperty import SelectionProperty
from backend.src.server.bo.TextProperty import TextProperty
from backend.src.server.bo.Information import Information
from backend.src.server.bo.SimilarityMeasure import SimilarityMeasure

from backend.src.server.db.BlocklistMapper import BlocklistMapper
from backend.src.server.db.BookmarklistMapper import BookmarklistMapper
from backend.src.server.db.ProfileMapper import ProfileMapper
from backend.src.server.db.UserMapper import UserMapper
from backend.src.server.db.SelectionPropertyMapper import SelectionPropertyMapper
from backend.src.server.db.TextPropertyMapper import TextPropertyMapper
from backend.src.server.db.InformationMapper import InformationMapper
from backend.src.server.db.PropertyMapper import PropertyMapper
from backend.src.server.db.MessageMapper import MessageMapper
from backend.src.server.db.ChatMapper import ChatMapper
from backend.src.server.db.ViewedMapper import ViewedMapper



class Administration():
    def __init__(self):
        pass


    '''
    User - Methoden
    '''
    def add_new_user(self, payload):
        userMapper = UserMapper()
        return userMapper.insert(payload)


    def get_user_by_id(self, id):
        userMapper = UserMapper()
        return userMapper.find_by_id(id)

    def get_user_by_name(self, name):
        with UserMapper() as mapper:
            return mapper.find_by_name(name)

    def get_all_users(self):
        user_mapper = UserMapper()
        return user_mapper.find_all()

    def get_user_by_email(self, email):
        user_mapper = UserMapper()
        return user_mapper.find_by_email(email)


    def update_user(self, id, payload):  # das selbe wie save user
        user = User()
        user.set_user_id(payload['UserID'])
        user.set_email(payload['email'])
        user.set_avatarurl(payload['ProfileIMGURL'])
        user.set_displayname(payload['displayname'])
        user_mapper = UserMapper()
        return user_mapper.update(user)

    def delete_user(self, id, payload):
        user = User()
        user.set_user_id(payload['UserID'])
        user.set_email(payload['email'])
        user.set_avatarurl(payload['ProfileIMGURL'])
        user.set_displayname(payload['displayname'])
        user_mapper = UserMapper()
        return user_mapper.delete(id, user)


    '''
    Profile Methoden
    '''

    def create_personal_profile_for_user(self, user):
        with ProfileMapper() as mapper:
            if user is not None:
                profile = Profile()
                profile.set_user_id(user.get_user_id())
                profile.set_is_personal(1)
                return mapper.insert(profile)
            else:
                return None

    def create_search_profile_for_user(self, user):
        with ProfileMapper() as mapper:
            if user is not None:
                profile = Profile()
                profile.set_user_id(user.get_user_id())
                profile.set_is_personal(0)
                return mapper.insert(profile)
            else:
                return None

    def get_all_profiles(self):
        with ProfileMapper() as mapper:
            return mapper.find_all()


    def get_all_personal_profiles(self):
        with ProfileMapper() as mapper:
            return mapper.find_all_personal()

    def get_profile_by_id(self, id):
        with ProfileMapper() as mapper:
            return mapper.find_by_id(id)

    def get_personal_profile_of_user(self, user):
        with ProfileMapper() as mapper:
            if user is not None:
                return mapper.find_personal_profile_of_owner(user)
            else:
                return None

    def get_search_profiles_of_user(self, user):
        with ProfileMapper() as mapper:
            if user is not None:
                return mapper.find_search_profiles_of_owner(user)
            else:
                return None

    def get_profiles_with_information(self, info):
        with ProfileMapper() as mapper:
            if info is not None:
                return mapper.find_by_information(info)
            else:
                return None

    def update_profile(self, profile):
        with ProfileMapper() as mapper:
            if profile is not None:
                return mapper.update(profile)
            else:
                return None

    def delete_profile(self, profile):
        with ProfileMapper() as mapper:
            if profile is not None:
                infos = self.get_infos_from_profile(profile)
                # if infos is not None:
                for info in infos:
                    self.delete_info(info)

                return mapper.delete(profile)
            else:
                return None

    def delete_user(self, user_id):
        search_prof = self.get_search_profiles_of_user(user_id)
        for i in search_prof:
            self.delete_profile(i)
        persprof = self.get_personal_profile_of_user(user_id)
        for j in persprof:
            self.delete_profile(j)

    '''
    Information-Methoden
    '''

    def create_info(self, profile, value_id):
        with InformationMapper() as mapper:
            if profile is not None:
                information = Information()
                information.set_profile_id(profile.get_id())
                information.set_value_id(value_id)

                return mapper.insert(information)

    def get_all_infos(self):
        with InformationMapper() as mapper:
            return mapper.find_all()

    def get_info_by_id(self, id):
        with InformationMapper() as mapper:
            return mapper.find_by_id(id)

    def get_infos_of_property(self, property):
        with InformationMapper() as mapper:
            return mapper.find_by_property(property)

    def get_infos_from_profile(self, profile):
        with InformationMapper() as mapper:
            if profile is not None:
                return mapper.find_by_profile(profile)
            else:
                return None

    def update_info(self, info, payload):
        with InformationMapper() as mapper:
            if info is not None and payload is not None:
                return mapper.update(info, payload)

    def delete_info(self, info):
        with InformationMapper() as mapper:
            if info is not None:
                return mapper.delete(info)

    def get_info_content(self, info):
        with InformationMapper() as mapper:
            if info is not None:
                return mapper.get_content_of_info(info)

    '''
    Property Methoden 
    '''
    # todo Wird nicht benutzt

    def create_property(self, value, is_selection, explanation):
        property = Property()
        property.set_name(value)
        property.set_is_selection(is_selection)
        property.set_description(explanation)

        with PropertyMapper() as mapper:
            return mapper.insert(property)


    def get_all_properties(self):
        with PropertyMapper() as mapper:
            return mapper.find_all()

    def get_property_by_id(self, id):
        with PropertyMapper() as mapper:
            return mapper.find_by_id(id)

    def get_property_by_name(self, name):
        with PropertyMapper() as mapper:
            return mapper.find_by_name(name)

    def update_property(self, property):
        with PropertyMapper() as mapper:
            return mapper.update(property)

    def delete_property(self, property):
        with PropertyMapper() as mapper:
            infos = self.get_infos_of_property(property)
            if infos is not None:
                for info in infos:
                    self.delete_info(info)

            mapper.delete(property)

    '''
        Bookmarklist Methoden
    '''

    def get_bookmarklist_by_user_id(self, user_id):
        mapper = BookmarklistMapper()
        return mapper.find_by_id(user_id)

    def add_user_to_bookmarklist(self, user_id, payload):
        bookmarklistmapper = BookmarklistMapper()
        return bookmarklistmapper.insert(user_id, payload)

    def remove_user_from_bookmarklist(self, user_id, payload):
        bookmarklistmapper = BookmarklistMapper()
        return bookmarklistmapper.delete(user_id, payload)

    '''
        Blocklist Methoden
    '''

    def get_blocklist_by_user_id(self, user_id):
        blocklistmapper = BlocklistMapper()
        return blocklistmapper.find_by_id(user_id)

    def add_user_to_blocklist(self, user_id, payload):
        blocklistmapper = BlocklistMapper()
        return blocklistmapper.insert(user_id, payload)

    def delete_blocklist(self, user_id, payload):
        blocklistmapper = BlocklistMapper()
        return blocklistmapper.delete(user_id, payload)


    '''
       Chat Methoden
    '''

    def get_chat_by_user_id(self, user_id):
        chatlistmapper = ChatMapper()
        return chatlistmapper.find_all(user_id)
        #with ChatMapper() as mapper:
            #return chatlistmapper.find_all(user_id)

    def add_chat_to_user(self, user_id, payload):
        chatmapper = ChatMapper()
        return chatmapper.insert(user_id, payload)
        #with ChatMapper() as mapper:
            #return mapper.insert(user_id, payload)

    '''
         Message Methoden
    '''

    def get_messages_by_chat_id(self, chat_id):
        messagemapper = MessageMapper()
        return messagemapper.find_by_id(chat_id)
        #with MessageMapper() as mapper:
            #return mapper.find_by_id(chat_id)

    def add_message_to_chat(self, user_id, payload):
        messagemapper = MessageMapper()
        return messagemapper.insert(user_id, payload)
        #with MessageMapper() as mapper:
           #return mapper.insert(user_id, payload)

    """
    SelectionProperty Methoden
    """
    def create_selection_property(self, name, description):
        sel_prop = SelectionProperty()
        sel_prop.set_name(name)
        sel_prop.set_is_selection(1)
        sel_prop.set_description(description)
        # sel_prop.set_selections(selections)

        with SelectionPropertyMapper() as mapper:
            return mapper.insert(sel_prop)

    def get_all_selection_properties(self):
        with SelectionPropertyMapper() as mapper:
            return mapper.find_all()

    def get_selection_property_by_id(self, id):
        with SelectionPropertyMapper() as mapper:
            return mapper.find_by_id(id)

    def get_selection_property_by_name(self, name):
        with SelectionPropertyMapper() as mapper:
            return mapper.find_by_name(name)

    def update_selection_property(self, sel_prop):
        with SelectionPropertyMapper() as mapper:
            return mapper.update(sel_prop)

    def delete_selection_property(self, sel_prop):
        with SelectionPropertyMapper() as mapper:
            if sel_prop is not None:
                #Deleting info objects of that selection property first
                infos = self.get_infos_of_property(sel_prop)
                if infos is not None:
                    for info in infos:
                        self.delete_info(info)

                return mapper.delete(sel_prop)
            else:
                return None

    def retrieve_options(self, sel_prop):
        with SelectionPropertyMapper() as mapper:
            if sel_prop is not None:
                return mapper.retrieve_selections(sel_prop)

    def add_option(self, sel_prop, payload):
        with SelectionPropertyMapper() as mapper:
            if sel_prop is not None and payload is not None:
                return mapper.add_selection(sel_prop, payload)

    def remove_option(self, value_id):
        with SelectionPropertyMapper() as mapper:
            return mapper.remove_selection(value_id)

    """
    TextProperty Methoden
    """
    def create_text_property(self, name, description):
        text_prop = TextProperty()
        text_prop.set_name(name)
        text_prop.set_is_selection(0)
        text_prop.set_description(description)

        with TextPropertyMapper() as mapper:
            return mapper.insert(text_prop)

    def get_all_text_properties(self):
        with TextPropertyMapper() as mapper:
            return mapper.find_all()

    def get_text_property_by_id(self, id):
        with TextPropertyMapper() as mapper:
            return mapper.find_by_id(id)

    def get_text_property_by_name(self, name):
        with TextPropertyMapper() as mapper:
            return mapper.find_by_name(name)

    def update_text_property(self, text_prop):
        with TextPropertyMapper() as mapper:
            return mapper.update(text_prop)

    def delete_text_property(self, text_prop):
        with TextPropertyMapper() as mapper:
            if text_prop is not None:
                # Deleting info objects of that selection property first
                infos = self.get_infos_of_property(text_prop)
                if infos is not None:
                    for info in infos:
                        self.delete_info(info)
                    return mapper.delete(text_prop)
            else:
                return None

    def add_text_entry(self, text_prop, payload): #call create_info right after
        with TextPropertyMapper() as mapper:
            if text_prop is not None:
                return mapper.insert_entry(text_prop, payload) #returns json with ValueID that can be used in create_info

    # def create_text_entry_for_profile(self, profile, text_prop, payload):
    #     if profile is not None and text_prop is not None:
    #         value_id = self.add_text_entry(text_prop, payload)
    #         self.create_info(profile, value_id)
    #         return payload

    def update_text_entry(self, value_id, payload):
        with TextPropertyMapper() as mapper:
            if payload is not None:
                return mapper.update_entry(value_id, payload)


    '''
        View Methoden
    '''


    def get_viewed_list_by_user_id(self, user_id):
        viewedMapper = ViewedMapper()
        return viewedMapper.find_by_id(user_id)


    def add_user_to_viewedList(self, user_id, payload):
        viewedMapper = ViewedMapper()
        return viewedMapper.insert(user_id, payload)


    def remove_user_to_viewedList(self, user_id, payload):
        viewedMapper = ViewedMapper()
        return viewedMapper.delete(user_id, payload)


    """
    Ähnlichkeitsmass - Ausführung
    (Die Logik, die hinter der Berechnung des Ähnlichkeitsmaßes steckt, ist in der Datei SimilarityMeasure.py zu finden)
    """
    def get_sorted_list_of_personal_profiles(self, search_profile):
        search_infos = self.get_infos_from_profile(search_profile)
        search_info_content = {}
        for info in search_infos: #dict erstellen mit allen infos des suchprofils
            search_content = self.get_info_content(info)
            search_info_content[search_content["property"]] = search_content["value"]

        personal_profiles = self.get_all_personal_profiles()
        similarity_profiles = []

        for profile in personal_profiles:
            infos = self.get_infos_from_profile(profile)
            info_content = {}
            for info in infos: #dict erstellen mit allen infos des aktuell iterierten profils
                content = self.get_info_content(info)
                info_content[content["property"]] = content["value"]

            sim = SimilarityMeasure(search_info_content, info_content)
            similarity = sim.get_similarity_measure()

            profile_and_sim = {} #dict erstellen mit profilen und ähnlichkeitsmaßen
            profile_and_sim['profile'] = profile
            profile_and_sim['similarity'] = similarity
            similarity_profiles.append(profile_and_sim)

        #dict sortieren nach ähnlichkeit
        similarity_profiles = sorted(similarity_profiles, key=lambda x: x['similarity'], reverse=True)

        #anstatt von profilen soll das frontend eine liste sortierter user bekommen:
        sorted_users = []
        for s in similarity_profiles:
            prof = s["profile"]
            user_id = prof.get_user_id()
            user = self.get_user_by_id(user_id)
            sorted_users.append(user)
            print(user_id)

        return similarity_profiles
