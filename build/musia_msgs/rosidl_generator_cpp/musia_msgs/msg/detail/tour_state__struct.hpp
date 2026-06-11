// generated from rosidl_generator_cpp/resource/idl__struct.hpp.em
// with input from musia_msgs:msg/TourState.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "musia_msgs/msg/tour_state.hpp"


#ifndef MUSIA_MSGS__MSG__DETAIL__TOUR_STATE__STRUCT_HPP_
#define MUSIA_MSGS__MSG__DETAIL__TOUR_STATE__STRUCT_HPP_

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
# define DEPRECATED__musia_msgs__msg__TourState __attribute__((deprecated))
#else
# define DEPRECATED__musia_msgs__msg__TourState __declspec(deprecated)
#endif

namespace musia_msgs
{

namespace msg
{

// message struct
template<class ContainerAllocator>
struct TourState_
{
  using Type = TourState_<ContainerAllocator>;

  explicit TourState_(rosidl_runtime_cpp::MessageInitialization _init = rosidl_runtime_cpp::MessageInitialization::ALL)
  : header(_init)
  {
    if (rosidl_runtime_cpp::MessageInitialization::ALL == _init ||
      rosidl_runtime_cpp::MessageInitialization::ZERO == _init)
    {
      this->state = 0;
      this->state_label = "";
      this->current_zone = "";
      this->current_waypoint = 0;
      this->network_available = false;
    }
  }

  explicit TourState_(const ContainerAllocator & _alloc, rosidl_runtime_cpp::MessageInitialization _init = rosidl_runtime_cpp::MessageInitialization::ALL)
  : header(_alloc, _init),
    state_label(_alloc),
    current_zone(_alloc)
  {
    if (rosidl_runtime_cpp::MessageInitialization::ALL == _init ||
      rosidl_runtime_cpp::MessageInitialization::ZERO == _init)
    {
      this->state = 0;
      this->state_label = "";
      this->current_zone = "";
      this->current_waypoint = 0;
      this->network_available = false;
    }
  }

  // field types and members
  using _header_type =
    std_msgs::msg::Header_<ContainerAllocator>;
  _header_type header;
  using _state_type =
    uint8_t;
  _state_type state;
  using _state_label_type =
    std::basic_string<char, std::char_traits<char>, typename std::allocator_traits<ContainerAllocator>::template rebind_alloc<char>>;
  _state_label_type state_label;
  using _current_zone_type =
    std::basic_string<char, std::char_traits<char>, typename std::allocator_traits<ContainerAllocator>::template rebind_alloc<char>>;
  _current_zone_type current_zone;
  using _current_waypoint_type =
    uint8_t;
  _current_waypoint_type current_waypoint;
  using _network_available_type =
    bool;
  _network_available_type network_available;

  // setters for named parameter idiom
  Type & set__header(
    const std_msgs::msg::Header_<ContainerAllocator> & _arg)
  {
    this->header = _arg;
    return *this;
  }
  Type & set__state(
    const uint8_t & _arg)
  {
    this->state = _arg;
    return *this;
  }
  Type & set__state_label(
    const std::basic_string<char, std::char_traits<char>, typename std::allocator_traits<ContainerAllocator>::template rebind_alloc<char>> & _arg)
  {
    this->state_label = _arg;
    return *this;
  }
  Type & set__current_zone(
    const std::basic_string<char, std::char_traits<char>, typename std::allocator_traits<ContainerAllocator>::template rebind_alloc<char>> & _arg)
  {
    this->current_zone = _arg;
    return *this;
  }
  Type & set__current_waypoint(
    const uint8_t & _arg)
  {
    this->current_waypoint = _arg;
    return *this;
  }
  Type & set__network_available(
    const bool & _arg)
  {
    this->network_available = _arg;
    return *this;
  }

  // constant declarations
  static constexpr uint8_t VEILLE =
    0u;
  static constexpr uint8_t ACCUEIL =
    1u;
  static constexpr uint8_t TRAITEMENT =
    2u;
  static constexpr uint8_t GUIDAGE =
    3u;
  static constexpr uint8_t PRESENTATION =
    4u;
  static constexpr uint8_t DEGRADE =
    5u;
  static constexpr uint8_t RETOUR =
    6u;

  // pointer types
  using RawPtr =
    musia_msgs::msg::TourState_<ContainerAllocator> *;
  using ConstRawPtr =
    const musia_msgs::msg::TourState_<ContainerAllocator> *;
  using SharedPtr =
    std::shared_ptr<musia_msgs::msg::TourState_<ContainerAllocator>>;
  using ConstSharedPtr =
    std::shared_ptr<musia_msgs::msg::TourState_<ContainerAllocator> const>;

  template<typename Deleter = std::default_delete<
      musia_msgs::msg::TourState_<ContainerAllocator>>>
  using UniquePtrWithDeleter =
    std::unique_ptr<musia_msgs::msg::TourState_<ContainerAllocator>, Deleter>;

  using UniquePtr = UniquePtrWithDeleter<>;

  template<typename Deleter = std::default_delete<
      musia_msgs::msg::TourState_<ContainerAllocator>>>
  using ConstUniquePtrWithDeleter =
    std::unique_ptr<musia_msgs::msg::TourState_<ContainerAllocator> const, Deleter>;
  using ConstUniquePtr = ConstUniquePtrWithDeleter<>;

  using WeakPtr =
    std::weak_ptr<musia_msgs::msg::TourState_<ContainerAllocator>>;
  using ConstWeakPtr =
    std::weak_ptr<musia_msgs::msg::TourState_<ContainerAllocator> const>;

  // pointer types similar to ROS 1, use SharedPtr / ConstSharedPtr instead
  // NOTE: Can't use 'using' here because GNU C++ can't parse attributes properly
  typedef DEPRECATED__musia_msgs__msg__TourState
    std::shared_ptr<musia_msgs::msg::TourState_<ContainerAllocator>>
    Ptr;
  typedef DEPRECATED__musia_msgs__msg__TourState
    std::shared_ptr<musia_msgs::msg::TourState_<ContainerAllocator> const>
    ConstPtr;

  // comparison operators
  bool operator==(const TourState_ & other) const
  {
    if (this->header != other.header) {
      return false;
    }
    if (this->state != other.state) {
      return false;
    }
    if (this->state_label != other.state_label) {
      return false;
    }
    if (this->current_zone != other.current_zone) {
      return false;
    }
    if (this->current_waypoint != other.current_waypoint) {
      return false;
    }
    if (this->network_available != other.network_available) {
      return false;
    }
    return true;
  }
  bool operator!=(const TourState_ & other) const
  {
    return !this->operator==(other);
  }
};  // struct TourState_

// alias to use template instance with default allocator
using TourState =
  musia_msgs::msg::TourState_<std::allocator<void>>;

// constant definitions
#if __cplusplus < 201703L
// static constexpr member variable definitions are only needed in C++14 and below, deprecated in C++17
template<typename ContainerAllocator>
constexpr uint8_t TourState_<ContainerAllocator>::VEILLE;
#endif  // __cplusplus < 201703L
#if __cplusplus < 201703L
// static constexpr member variable definitions are only needed in C++14 and below, deprecated in C++17
template<typename ContainerAllocator>
constexpr uint8_t TourState_<ContainerAllocator>::ACCUEIL;
#endif  // __cplusplus < 201703L
#if __cplusplus < 201703L
// static constexpr member variable definitions are only needed in C++14 and below, deprecated in C++17
template<typename ContainerAllocator>
constexpr uint8_t TourState_<ContainerAllocator>::TRAITEMENT;
#endif  // __cplusplus < 201703L
#if __cplusplus < 201703L
// static constexpr member variable definitions are only needed in C++14 and below, deprecated in C++17
template<typename ContainerAllocator>
constexpr uint8_t TourState_<ContainerAllocator>::GUIDAGE;
#endif  // __cplusplus < 201703L
#if __cplusplus < 201703L
// static constexpr member variable definitions are only needed in C++14 and below, deprecated in C++17
template<typename ContainerAllocator>
constexpr uint8_t TourState_<ContainerAllocator>::PRESENTATION;
#endif  // __cplusplus < 201703L
#if __cplusplus < 201703L
// static constexpr member variable definitions are only needed in C++14 and below, deprecated in C++17
template<typename ContainerAllocator>
constexpr uint8_t TourState_<ContainerAllocator>::DEGRADE;
#endif  // __cplusplus < 201703L
#if __cplusplus < 201703L
// static constexpr member variable definitions are only needed in C++14 and below, deprecated in C++17
template<typename ContainerAllocator>
constexpr uint8_t TourState_<ContainerAllocator>::RETOUR;
#endif  // __cplusplus < 201703L

}  // namespace msg

}  // namespace musia_msgs

#endif  // MUSIA_MSGS__MSG__DETAIL__TOUR_STATE__STRUCT_HPP_
