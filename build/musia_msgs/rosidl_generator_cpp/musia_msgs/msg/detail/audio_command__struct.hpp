// generated from rosidl_generator_cpp/resource/idl__struct.hpp.em
// with input from musia_msgs:msg/AudioCommand.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "musia_msgs/msg/audio_command.hpp"


#ifndef MUSIA_MSGS__MSG__DETAIL__AUDIO_COMMAND__STRUCT_HPP_
#define MUSIA_MSGS__MSG__DETAIL__AUDIO_COMMAND__STRUCT_HPP_

#include <algorithm>
#include <array>
#include <cstdint>
#include <memory>
#include <string>
#include <vector>

#include "rosidl_runtime_cpp/bounded_vector.hpp"
#include "rosidl_runtime_cpp/message_initialization.hpp"


// Include directives for member types
// Member 'header'
#include "std_msgs/msg/detail/header__struct.hpp"

#ifndef _WIN32
# define DEPRECATED__musia_msgs__msg__AudioCommand __attribute__((deprecated))
#else
# define DEPRECATED__musia_msgs__msg__AudioCommand __declspec(deprecated)
#endif

namespace musia_msgs
{

namespace msg
{

// message struct
template<class ContainerAllocator>
struct AudioCommand_
{
  using Type = AudioCommand_<ContainerAllocator>;

  explicit AudioCommand_(rosidl_runtime_cpp::MessageInitialization _init = rosidl_runtime_cpp::MessageInitialization::ALL)
  : header(_init)
  {
    if (rosidl_runtime_cpp::MessageInitialization::ALL == _init ||
      rosidl_runtime_cpp::MessageInitialization::ZERO == _init)
    {
      this->mode = 0;
      this->payload = "";
      this->language = "";
      this->volume = 0.0f;
    }
  }

  explicit AudioCommand_(const ContainerAllocator & _alloc, rosidl_runtime_cpp::MessageInitialization _init = rosidl_runtime_cpp::MessageInitialization::ALL)
  : header(_alloc, _init),
    payload(_alloc),
    language(_alloc)
  {
    if (rosidl_runtime_cpp::MessageInitialization::ALL == _init ||
      rosidl_runtime_cpp::MessageInitialization::ZERO == _init)
    {
      this->mode = 0;
      this->payload = "";
      this->language = "";
      this->volume = 0.0f;
    }
  }

  // field types and members
  using _header_type =
    std_msgs::msg::Header_<ContainerAllocator>;
  _header_type header;
  using _mode_type =
    uint8_t;
  _mode_type mode;
  using _payload_type =
    std::basic_string<char, std::char_traits<char>, typename std::allocator_traits<ContainerAllocator>::template rebind_alloc<char>>;
  _payload_type payload;
  using _language_type =
    std::basic_string<char, std::char_traits<char>, typename std::allocator_traits<ContainerAllocator>::template rebind_alloc<char>>;
  _language_type language;
  using _volume_type =
    float;
  _volume_type volume;

  // setters for named parameter idiom
  Type & set__header(
    const std_msgs::msg::Header_<ContainerAllocator> & _arg)
  {
    this->header = _arg;
    return *this;
  }
  Type & set__mode(
    const uint8_t & _arg)
  {
    this->mode = _arg;
    return *this;
  }
  Type & set__payload(
    const std::basic_string<char, std::char_traits<char>, typename std::allocator_traits<ContainerAllocator>::template rebind_alloc<char>> & _arg)
  {
    this->payload = _arg;
    return *this;
  }
  Type & set__language(
    const std::basic_string<char, std::char_traits<char>, typename std::allocator_traits<ContainerAllocator>::template rebind_alloc<char>> & _arg)
  {
    this->language = _arg;
    return *this;
  }
  Type & set__volume(
    const float & _arg)
  {
    this->volume = _arg;
    return *this;
  }

  // constant declarations
  static constexpr uint8_t MODE_FILE =
    0u;
  static constexpr uint8_t MODE_TTS_OFFLINE =
    1u;
  static constexpr uint8_t MODE_TTS_ONLINE =
    2u;

  // pointer types
  using RawPtr =
    musia_msgs::msg::AudioCommand_<ContainerAllocator> *;
  using ConstRawPtr =
    const musia_msgs::msg::AudioCommand_<ContainerAllocator> *;
  using SharedPtr =
    std::shared_ptr<musia_msgs::msg::AudioCommand_<ContainerAllocator>>;
  using ConstSharedPtr =
    std::shared_ptr<musia_msgs::msg::AudioCommand_<ContainerAllocator> const>;

  template<typename Deleter = std::default_delete<
      musia_msgs::msg::AudioCommand_<ContainerAllocator>>>
  using UniquePtrWithDeleter =
    std::unique_ptr<musia_msgs::msg::AudioCommand_<ContainerAllocator>, Deleter>;

  using UniquePtr = UniquePtrWithDeleter<>;

  template<typename Deleter = std::default_delete<
      musia_msgs::msg::AudioCommand_<ContainerAllocator>>>
  using ConstUniquePtrWithDeleter =
    std::unique_ptr<musia_msgs::msg::AudioCommand_<ContainerAllocator> const, Deleter>;
  using ConstUniquePtr = ConstUniquePtrWithDeleter<>;

  using WeakPtr =
    std::weak_ptr<musia_msgs::msg::AudioCommand_<ContainerAllocator>>;
  using ConstWeakPtr =
    std::weak_ptr<musia_msgs::msg::AudioCommand_<ContainerAllocator> const>;

  // pointer types similar to ROS 1, use SharedPtr / ConstSharedPtr instead
  // NOTE: Can't use 'using' here because GNU C++ can't parse attributes properly
  typedef DEPRECATED__musia_msgs__msg__AudioCommand
    std::shared_ptr<musia_msgs::msg::AudioCommand_<ContainerAllocator>>
    Ptr;
  typedef DEPRECATED__musia_msgs__msg__AudioCommand
    std::shared_ptr<musia_msgs::msg::AudioCommand_<ContainerAllocator> const>
    ConstPtr;

  // comparison operators
  bool operator==(const AudioCommand_ & other) const
  {
    if (this->header != other.header) {
      return false;
    }
    if (this->mode != other.mode) {
      return false;
    }
    if (this->payload != other.payload) {
      return false;
    }
    if (this->language != other.language) {
      return false;
    }
    if (this->volume != other.volume) {
      return false;
    }
    return true;
  }
  bool operator!=(const AudioCommand_ & other) const
  {
    return !this->operator==(other);
  }
};  // struct AudioCommand_

// alias to use template instance with default allocator
using AudioCommand =
  musia_msgs::msg::AudioCommand_<std::allocator<void>>;

// constant definitions
#if __cplusplus < 201703L
// static constexpr member variable definitions are only needed in C++14 and below, deprecated in C++17
template<typename ContainerAllocator>
constexpr uint8_t AudioCommand_<ContainerAllocator>::MODE_FILE;
#endif  // __cplusplus < 201703L
#if __cplusplus < 201703L
// static constexpr member variable definitions are only needed in C++14 and below, deprecated in C++17
template<typename ContainerAllocator>
constexpr uint8_t AudioCommand_<ContainerAllocator>::MODE_TTS_OFFLINE;
#endif  // __cplusplus < 201703L
#if __cplusplus < 201703L
// static constexpr member variable definitions are only needed in C++14 and below, deprecated in C++17
template<typename ContainerAllocator>
constexpr uint8_t AudioCommand_<ContainerAllocator>::MODE_TTS_ONLINE;
#endif  // __cplusplus < 201703L

}  // namespace msg

}  // namespace musia_msgs

#endif  // MUSIA_MSGS__MSG__DETAIL__AUDIO_COMMAND__STRUCT_HPP_
