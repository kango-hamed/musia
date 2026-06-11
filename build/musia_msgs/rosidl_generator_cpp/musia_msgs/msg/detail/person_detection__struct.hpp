// generated from rosidl_generator_cpp/resource/idl__struct.hpp.em
// with input from musia_msgs:msg/PersonDetection.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "musia_msgs/msg/person_detection.hpp"


#ifndef MUSIA_MSGS__MSG__DETAIL__PERSON_DETECTION__STRUCT_HPP_
#define MUSIA_MSGS__MSG__DETAIL__PERSON_DETECTION__STRUCT_HPP_

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
# define DEPRECATED__musia_msgs__msg__PersonDetection __attribute__((deprecated))
#else
# define DEPRECATED__musia_msgs__msg__PersonDetection __declspec(deprecated)
#endif

namespace musia_msgs
{

namespace msg
{

// message struct
template<class ContainerAllocator>
struct PersonDetection_
{
  using Type = PersonDetection_<ContainerAllocator>;

  explicit PersonDetection_(rosidl_runtime_cpp::MessageInitialization _init = rosidl_runtime_cpp::MessageInitialization::ALL)
  : header(_init)
  {
    if (rosidl_runtime_cpp::MessageInitialization::ALL == _init ||
      rosidl_runtime_cpp::MessageInitialization::ZERO == _init)
    {
      this->person_detected = false;
      this->distance_m = 0.0f;
      this->confidence = 0.0f;
    }
  }

  explicit PersonDetection_(const ContainerAllocator & _alloc, rosidl_runtime_cpp::MessageInitialization _init = rosidl_runtime_cpp::MessageInitialization::ALL)
  : header(_alloc, _init)
  {
    if (rosidl_runtime_cpp::MessageInitialization::ALL == _init ||
      rosidl_runtime_cpp::MessageInitialization::ZERO == _init)
    {
      this->person_detected = false;
      this->distance_m = 0.0f;
      this->confidence = 0.0f;
    }
  }

  // field types and members
  using _header_type =
    std_msgs::msg::Header_<ContainerAllocator>;
  _header_type header;
  using _person_detected_type =
    bool;
  _person_detected_type person_detected;
  using _distance_m_type =
    float;
  _distance_m_type distance_m;
  using _confidence_type =
    float;
  _confidence_type confidence;

  // setters for named parameter idiom
  Type & set__header(
    const std_msgs::msg::Header_<ContainerAllocator> & _arg)
  {
    this->header = _arg;
    return *this;
  }
  Type & set__person_detected(
    const bool & _arg)
  {
    this->person_detected = _arg;
    return *this;
  }
  Type & set__distance_m(
    const float & _arg)
  {
    this->distance_m = _arg;
    return *this;
  }
  Type & set__confidence(
    const float & _arg)
  {
    this->confidence = _arg;
    return *this;
  }

  // constant declarations

  // pointer types
  using RawPtr =
    musia_msgs::msg::PersonDetection_<ContainerAllocator> *;
  using ConstRawPtr =
    const musia_msgs::msg::PersonDetection_<ContainerAllocator> *;
  using SharedPtr =
    std::shared_ptr<musia_msgs::msg::PersonDetection_<ContainerAllocator>>;
  using ConstSharedPtr =
    std::shared_ptr<musia_msgs::msg::PersonDetection_<ContainerAllocator> const>;

  template<typename Deleter = std::default_delete<
      musia_msgs::msg::PersonDetection_<ContainerAllocator>>>
  using UniquePtrWithDeleter =
    std::unique_ptr<musia_msgs::msg::PersonDetection_<ContainerAllocator>, Deleter>;

  using UniquePtr = UniquePtrWithDeleter<>;

  template<typename Deleter = std::default_delete<
      musia_msgs::msg::PersonDetection_<ContainerAllocator>>>
  using ConstUniquePtrWithDeleter =
    std::unique_ptr<musia_msgs::msg::PersonDetection_<ContainerAllocator> const, Deleter>;
  using ConstUniquePtr = ConstUniquePtrWithDeleter<>;

  using WeakPtr =
    std::weak_ptr<musia_msgs::msg::PersonDetection_<ContainerAllocator>>;
  using ConstWeakPtr =
    std::weak_ptr<musia_msgs::msg::PersonDetection_<ContainerAllocator> const>;

  // pointer types similar to ROS 1, use SharedPtr / ConstSharedPtr instead
  // NOTE: Can't use 'using' here because GNU C++ can't parse attributes properly
  typedef DEPRECATED__musia_msgs__msg__PersonDetection
    std::shared_ptr<musia_msgs::msg::PersonDetection_<ContainerAllocator>>
    Ptr;
  typedef DEPRECATED__musia_msgs__msg__PersonDetection
    std::shared_ptr<musia_msgs::msg::PersonDetection_<ContainerAllocator> const>
    ConstPtr;

  // comparison operators
  bool operator==(const PersonDetection_ & other) const
  {
    if (this->header != other.header) {
      return false;
    }
    if (this->person_detected != other.person_detected) {
      return false;
    }
    if (this->distance_m != other.distance_m) {
      return false;
    }
    if (this->confidence != other.confidence) {
      return false;
    }
    return true;
  }
  bool operator!=(const PersonDetection_ & other) const
  {
    return !this->operator==(other);
  }
};  // struct PersonDetection_

// alias to use template instance with default allocator
using PersonDetection =
  musia_msgs::msg::PersonDetection_<std::allocator<void>>;

// constant definitions

}  // namespace msg

}  // namespace musia_msgs

#endif  // MUSIA_MSGS__MSG__DETAIL__PERSON_DETECTION__STRUCT_HPP_
