import streamlit as st
import base64

# Declare a Streamlit component.
# It will be served by the local webpack dev server that you can
# run via `npm run start`.
MyComponent = st.declare_component(url="http://localhost:3001")

# Alternately, if you've built a production version of the component,
# you can register the component's static files via the `path` param:
# MyComponent = st.declare_component(path="frontend/build")


# Add a wrapper function to the component.
# This is an optional step that enables you to customize your component's
# API, pre-process its input args, and post-process its output value.
@MyComponent
def create_instance(f, path, key=None):
    with open(path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read())
        encoded_string = encoded_string.decode('utf-8')

    return f(image=encoded_string, key=key, default=0)

# Register the component. This assigns it a name within the Streamlit
# namespace. "Declaration" and "registration" are separate steps:
# generally, the component *creator* will do the declaration part,
# and a component *user* will do the registration.
st.register_component("image_coordinates", MyComponent)

# Create an instance of the component. Arguments we pass here will be
# available in an "args" dictionary in the component. "default" is a special
# argument that specifies the initial return value of my_component, before the
# user has interacted with it.

st.header("Get coordinates of an image")

coords = st.image_coordinates("bike.jpg")

st.write(coords)
