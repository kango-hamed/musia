from setuptools import find_packages, setup

package_name = "musia_arduino_bridge"

setup(
    name=package_name,
    version="0.1.0",
    packages=find_packages(exclude=["test"]),
    data_files=[
        ("share/ament_index/resource_index/packages",
            ["resource/" + package_name]),
        ("share/" + package_name, ["package.xml"]),
    ],
    install_requires=["setuptools"],
    zip_safe=True,
    maintainer="Hamed",
    maintainer_email="hamed@esatic.ci",
    description="MUSIA Arduino Bridge",
    license="MIT",
    tests_require=["pytest"],
    entry_points={
        "console_scripts": [
            "arduino_bridge_node = musia_arduino_bridge.arduino_bridge_node:main",
        ],
    },
)
