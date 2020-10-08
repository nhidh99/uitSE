from PIL import Image
import os

resolutions = [1000, 400, 150]


def make_images():
    raw_images_path = 'laptops/raw'
    i = 1
    for subdir, dirs, files in os.walk(raw_images_path):
        if subdir == raw_images_path: continue
        folder_name = subdir.split('/')[-1].split('\\')[-1]
        folder_primary = 'laptops/edited/primary/%s' % folder_name
        folder_secondary = 'laptops/edited/secondary/%s' % folder_name

        for res in resolutions:
            os.makedirs('%s/%d' % (folder_primary, res), exist_ok=True)
            os.makedirs('%s/%d' % (folder_secondary, res), exist_ok=True)

        for file_name in files:
            image_path = os.path.join(subdir, file_name)
            make_scaled_image(image_path, folder_name, file_name)
        print('%d. Scaled: %s' % (i, folder_name))
        i += 1


def make_scaled_image(image_path, folder_name, file_name):
    is_primary_image = file_name.startswith('1-')
    for res in resolutions:
        img = Image.open(image_path).resize((res, res), Image.LANCZOS)
        des_path = 'laptops/edited/%s/%s/%d/%s' % (
            'primary' if is_primary_image else 'secondary', folder_name, res, file_name)
        if des_path.endswith('.jpg') or des_path.endswith('.JPG') or des_path.endswith('.jpeg'):
            img.save(des_path, quality=95, optimize=True)
        else:
            print(des_path + ' converted')
            img.convert('RGB').save(des_path.replace('.png', '.jpg'), "JPEG", quality=95, optimize=True)


make_images()
