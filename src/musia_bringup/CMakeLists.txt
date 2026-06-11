cmake_minimum_required(VERSION 3.8)
project(musia_bringup)

find_package(ament_cmake REQUIRED)

# Installer les launch files
install(DIRECTORY launch/
  DESTINATION share/${PROJECT_NAME}/launch
)

# Installer les configs
install(DIRECTORY config/
  DESTINATION share/${PROJECT_NAME}/config
)

# Installer les cartes
install(DIRECTORY maps/
  DESTINATION share/${PROJECT_NAME}/maps
)

if(BUILD_TESTING)
  find_package(ament_lint_auto REQUIRED)
  ament_lint_auto_find_test_dependencies()
endif()

ament_package()
