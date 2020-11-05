from PIL import Image
import os


def make_images():
    raw_images_path = 'promotions/raw'
    i = 1
    for subdir, dirs, files in os.walk(raw_images_path):
        for file_name in files:
            image_path = os.path.join(subdir, file_name)
            make_scaled_image(image_path, file_name)
            print('%d. Scaled: %s' % (i, file_name))
            i += 1


def make_scaled_image(image_path, file_name):
    img = Image.open(image_path).resize((200, 200), Image.LANCZOS)
    des_path = 'promotions/edited/%s' % (file_name)
    img.save(des_path, quality=95, optimize=True)


make_images()
