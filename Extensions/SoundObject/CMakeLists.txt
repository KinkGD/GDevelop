cmake_minimum_required(VERSION 2.6)
cmake_policy(SET CMP0015 NEW)

project(SoundObject)
gd_add_extension_includes()

#Defines
###
gd_add_extension_definitions(SoundObject)

#The targets
###
include_directories(.)
file(GLOB source_files *.cpp *.h)
gd_add_clang_utils(SoundObject "${source_files}")

gd_add_extension_target(SoundObject "${source_files}")
gdcpp_add_runtime_extension_target(SoundObject_Runtime "${source_files}")

#Linker files for the IDE extension
###
gd_extension_link_libraries(SoundObject)

#Linker files for the GD C++ Runtime extension
###
gdcpp_runtime_extension_link_libraries(SoundObject_Runtime)
