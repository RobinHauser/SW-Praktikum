class SimilarityMeasure:
    def __init__(self, profile1, profile2):
        """initialize a new instance of SimilarityMeasure to compare two Profiles"""
        self.__search_profile = profile1
        self.__user_profile = profile2

    @staticmethod
    def __get_num_sim(search_num, user_num):
        """Get the weighted similarity between two numbers

        The border is a threshold above which the similarity between two profiles is considered 0%
        The border is calculated by taking 10% of the higher number.
        After that the absolute amount of the difference of the two given numbers is calculated.
        Then it is checked whether the difference is greater than the border and, if necessary, it gets replaced by the
        border to avoid that the similarity value drops below 0.
        Finally, calculate the weighted deviation by dividing the result by the border Value and subtracting it from 1
        to convert the deviation into the similarity.
        """
        # calculate the border
        border = search_num / 10

        # Absolute value of the difference
        result = abs(search_num - user_num)

        # If the result is greater than the border, set it to border value to obtain a maximum final return value of 1
        result = min(result, border)

        # calculate the weighted deviation by dividing the result by 5
        # Subtract the weighted deviation from 1 to convert the deviation into the similarity
        return 1 - result / border

    @staticmethod
    def __get_string_sim(search_str, user_str):
        """Get the similarity between two strings

            The information string of the 2 profiles are split in the lowercase words of the two strings.
            After that the words of one string are checked on similarity with the words of the other string.
            Finally, the similar word count is divided threw the length of the shorter word list of phrases to get the
            similarity of the two phrases.
            """
        search_str = search_str.lower().split(" ")
        user_str = user_str.lower().split(" ")
        similar_words = 0

        # check for similaritys in the two lists
        for word in search_str:
            if word in user_str:
                similar_words += 1

        # calculate and return the similarity of the two phrases
        return similar_words / min(len(search_str), len(user_str))

    def get_similarity_measure(self):
        """Get the similarity measure of two users

        First calculate the similarity of every single Property between the Users and save it in list_diff.
        Then calculate the mean value of all Properties to get the similarity measure
        """
        list_diff = []

        for prop in self.__search_profile:
            if self.__search_profile[prop] != "Keine Angabe" and self.__user_profile[prop] != "Keine Angabe":
                if (type(self.__search_profile[prop])) == str:
                    list_diff.append(self.__get_string_sim(self.__search_profile[prop], self.__user_profile[prop]))
                else:
                    list_diff.append(self.__get_num_sim(self.__search_profile[prop], self.__user_profile[prop]))
            # print(f"{i} Ähnlichkeitsmaß: {list_diff[-1]}")

        # If one User didn't set any Properties return 0 as similarity between the Users
        if len(list_diff) == 0:
            return 0

        # calculate the mean value of the similarity measure of every Property
        similarity_measure = sum(list_diff) / len(list_diff)
        # round the similarity_measure by 2 digits
        return round(similarity_measure, 2)


test_profile1 = {
    "smoker": "yes",
    "height": 187,
    "age": 20,
    "religion": "ev",
    "sunday morning": "wenn ich mit einem Kaffee geweckt werden :)"
}
test_profile2 = {
    "smoker": "no",
    "height": 175,
    "age": 18,
    "religion": "ev",
    "sunday morning": "mit einem Kaffee aufzuwachen"
}
test_profile3 = {
    "smoker": "yes",
    "height": 187,
    "age": 20,
    "religion": "ev",
    "sunday morning": "wenn ich mit einem Kaffee geweckt werden :)"
}

test = SimilarityMeasure(test_profile1, test_profile2)
print(f"Ähnlichkeitsmaß: {test.get_similarity_measure()}")
