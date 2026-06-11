from setuptools import find_packages, setup

package_name = 'musia_tour_manager'

setup(
    name=package_name,
    version='0.1.0',
    packages=find_packages(exclude=['test']),
    data_files=[
        ('share/ament_index/resource_index/packages',
            ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
        ('lib/' + package_name, ['scripts/tour_manager_node']),
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='Hamed',
    maintainer_email='hamed.diakite@hotmail.com',
    description='MUSIA Tour Manager — Machine à états 7 états (robot guide Famienkro)',
    license='MIT',
    tests_require=['pytest'],
    entry_points={
        'console_scripts': [
            'tour_manager_node = musia_tour_manager.tour_manager_node:main',
        ],
    },
)
