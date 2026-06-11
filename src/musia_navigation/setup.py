from setuptools import find_packages, setup

package_name = 'musia_navigation'

setup(
    name=package_name,
    version='0.1.0',
    packages=find_packages(exclude=['test']),
    data_files=[
        ('share/ament_index/resource_index/packages',
            ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
        ('lib/' + package_name, []),
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='Hamed',
    maintainer_email='hamed@esatic.ci',
    description='MUSIA Navigation — Relay NAV_TO:WPx → Nav2 NavigateToPose',
    license='MIT',
    tests_require=['pytest'],
    entry_points={
        'console_scripts': [
            'navigation_node = musia_navigation.navigation_node:main',
        ],
    },
)
