from flask import request
from google.auth.transport import requests
import google.oauth2.id_token


"""
inspired by: Prof. Dr. Thies
"""
def secured(function):
    firebase_request_adapter = requests.Request()

    def wrapper(*args, **kwargs):
        id_token = request.cookies.get("token")

        if id_token:
            try:
                claims = google.oauth2.id_token.verify_firebase_token(
                    id_token, firebase_request_adapter)

                if claims is not None:

                    google_user_id = claims.get("user_id")
                    email = claims.get("email")
                    name = claims.get("name")

                    print(google_user_id)
                    print(email)
                    print(name)

                    #TODO check if we can maybe init the user here?

                    objects = function(*args, **kwargs)

                    return objects
                else:
                    return 'The user is unauthorized', 401
            except ValueError:
                return 'The user is unauthorized', 401

        return 'The user is unauthorized', 401

    return wrapper
