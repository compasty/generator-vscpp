include(FetchContent)
FetchContent_Declare(fmt GIT_REPOSITORY https://github.com/fmtlib/fmt.git
                         GIT_TAG 9.1.0
                         SOURCE_DIR "${PROJECT_SOURCE_DIR}/third_party/fmt")
FetchContent_MakeAvailable(fmt)
