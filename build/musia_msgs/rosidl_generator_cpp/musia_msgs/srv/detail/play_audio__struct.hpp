// generated from rosidl_generator_cpp/resource/idl__struct.hpp.em
// with input from musia_msgs:srv/PlayAudio.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "musia_msgs/srv/play_audio.hpp"


#ifndef MUSIA_MSGS__SRV__DETAIL__PLAY_AUDIO__STRUCT_HPP_
#define MUSIA_MSGS__SRV__DETAIL__PLAY_AUDIO__STRUCT_HPP_

#include <algorithm>
#include <array>
#include <cstdint>
#include <memory>
#include <string>
#include <vector>

#include "rosidl_runtime_cpp/bounded_vector.hpp"
#include "rosidl_runtime_cpp/message_initialization.hpp"


#ifndef _WIN32
# define DEPRECATED__musia_msgs__srv__PlayAudio_Request __attribute__((deprecated))
#else
# define DEPRECATED__musia_msgs__srv__PlayAudio_Request __declspec(deprecated)
#endif

namespace musia_msgs
{

namespace srv
{

// message struct
template<class ContainerAllocator>
struct PlayAudio_Request_
{
  using Type = PlayAudio_Request_<ContainerAllocator>;

  explicit PlayAudio_Request_(rosidl_runtime_cpp::MessageInitialization _init = rosidl_runtime_cpp::MessageInitialization::ALL)
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

  explicit PlayAudio_Request_(const ContainerAllocator & _alloc, rosidl_runtime_cpp::MessageInitialization _init = rosidl_runtime_cpp::MessageInitialization::ALL)
  : payload(_alloc),
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

  // pointer types
  using RawPtr =
    musia_msgs::srv::PlayAudio_Request_<ContainerAllocator> *;
  using ConstRawPtr =
    const musia_msgs::srv::PlayAudio_Request_<ContainerAllocator> *;
  using SharedPtr =
    std::shared_ptr<musia_msgs::srv::PlayAudio_Request_<ContainerAllocator>>;
  using ConstSharedPtr =
    std::shared_ptr<musia_msgs::srv::PlayAudio_Request_<ContainerAllocator> const>;

  template<typename Deleter = std::default_delete<
      musia_msgs::srv::PlayAudio_Request_<ContainerAllocator>>>
  using UniquePtrWithDeleter =
    std::unique_ptr<musia_msgs::srv::PlayAudio_Request_<ContainerAllocator>, Deleter>;

  using UniquePtr = UniquePtrWithDeleter<>;

  template<typename Deleter = std::default_delete<
      musia_msgs::srv::PlayAudio_Request_<ContainerAllocator>>>
  using ConstUniquePtrWithDeleter =
    std::unique_ptr<musia_msgs::srv::PlayAudio_Request_<ContainerAllocator> const, Deleter>;
  using ConstUniquePtr = ConstUniquePtrWithDeleter<>;

  using WeakPtr =
    std::weak_ptr<musia_msgs::srv::PlayAudio_Request_<ContainerAllocator>>;
  using ConstWeakPtr =
    std::weak_ptr<musia_msgs::srv::PlayAudio_Request_<ContainerAllocator> const>;

  // pointer types similar to ROS 1, use SharedPtr / ConstSharedPtr instead
  // NOTE: Can't use 'using' here because GNU C++ can't parse attributes properly
  typedef DEPRECATED__musia_msgs__srv__PlayAudio_Request
    std::shared_ptr<musia_msgs::srv::PlayAudio_Request_<ContainerAllocator>>
    Ptr;
  typedef DEPRECATED__musia_msgs__srv__PlayAudio_Request
    std::shared_ptr<musia_msgs::srv::PlayAudio_Request_<ContainerAllocator> const>
    ConstPtr;

  // comparison operators
  bool operator==(const PlayAudio_Request_ & other) const
  {
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
  bool operator!=(const PlayAudio_Request_ & other) const
  {
    return !this->operator==(other);
  }
};  // struct PlayAudio_Request_

// alias to use template instance with default allocator
using PlayAudio_Request =
  musia_msgs::srv::PlayAudio_Request_<std::allocator<void>>;

// constant definitions

}  // namespace srv

}  // namespace musia_msgs


#ifndef _WIN32
# define DEPRECATED__musia_msgs__srv__PlayAudio_Response __attribute__((deprecated))
#else
# define DEPRECATED__musia_msgs__srv__PlayAudio_Response __declspec(deprecated)
#endif

namespace musia_msgs
{

namespace srv
{

// message struct
template<class ContainerAllocator>
struct PlayAudio_Response_
{
  using Type = PlayAudio_Response_<ContainerAllocator>;

  explicit PlayAudio_Response_(rosidl_runtime_cpp::MessageInitialization _init = rosidl_runtime_cpp::MessageInitialization::ALL)
  {
    if (rosidl_runtime_cpp::MessageInitialization::ALL == _init ||
      rosidl_runtime_cpp::MessageInitialization::ZERO == _init)
    {
      this->success = false;
      this->duration_s = 0.0f;
    }
  }

  explicit PlayAudio_Response_(const ContainerAllocator & _alloc, rosidl_runtime_cpp::MessageInitialization _init = rosidl_runtime_cpp::MessageInitialization::ALL)
  {
    (void)_alloc;
    if (rosidl_runtime_cpp::MessageInitialization::ALL == _init ||
      rosidl_runtime_cpp::MessageInitialization::ZERO == _init)
    {
      this->success = false;
      this->duration_s = 0.0f;
    }
  }

  // field types and members
  using _success_type =
    bool;
  _success_type success;
  using _duration_s_type =
    float;
  _duration_s_type duration_s;

  // setters for named parameter idiom
  Type & set__success(
    const bool & _arg)
  {
    this->success = _arg;
    return *this;
  }
  Type & set__duration_s(
    const float & _arg)
  {
    this->duration_s = _arg;
    return *this;
  }

  // constant declarations

  // pointer types
  using RawPtr =
    musia_msgs::srv::PlayAudio_Response_<ContainerAllocator> *;
  using ConstRawPtr =
    const musia_msgs::srv::PlayAudio_Response_<ContainerAllocator> *;
  using SharedPtr =
    std::shared_ptr<musia_msgs::srv::PlayAudio_Response_<ContainerAllocator>>;
  using ConstSharedPtr =
    std::shared_ptr<musia_msgs::srv::PlayAudio_Response_<ContainerAllocator> const>;

  template<typename Deleter = std::default_delete<
      musia_msgs::srv::PlayAudio_Response_<ContainerAllocator>>>
  using UniquePtrWithDeleter =
    std::unique_ptr<musia_msgs::srv::PlayAudio_Response_<ContainerAllocator>, Deleter>;

  using UniquePtr = UniquePtrWithDeleter<>;

  template<typename Deleter = std::default_delete<
      musia_msgs::srv::PlayAudio_Response_<ContainerAllocator>>>
  using ConstUniquePtrWithDeleter =
    std::unique_ptr<musia_msgs::srv::PlayAudio_Response_<ContainerAllocator> const, Deleter>;
  using ConstUniquePtr = ConstUniquePtrWithDeleter<>;

  using WeakPtr =
    std::weak_ptr<musia_msgs::srv::PlayAudio_Response_<ContainerAllocator>>;
  using ConstWeakPtr =
    std::weak_ptr<musia_msgs::srv::PlayAudio_Response_<ContainerAllocator> const>;

  // pointer types similar to ROS 1, use SharedPtr / ConstSharedPtr instead
  // NOTE: Can't use 'using' here because GNU C++ can't parse attributes properly
  typedef DEPRECATED__musia_msgs__srv__PlayAudio_Response
    std::shared_ptr<musia_msgs::srv::PlayAudio_Response_<ContainerAllocator>>
    Ptr;
  typedef DEPRECATED__musia_msgs__srv__PlayAudio_Response
    std::shared_ptr<musia_msgs::srv::PlayAudio_Response_<ContainerAllocator> const>
    ConstPtr;

  // comparison operators
  bool operator==(const PlayAudio_Response_ & other) const
  {
    if (this->success != other.success) {
      return false;
    }
    if (this->duration_s != other.duration_s) {
      return false;
    }
    return true;
  }
  bool operator!=(const PlayAudio_Response_ & other) const
  {
    return !this->operator==(other);
  }
};  // struct PlayAudio_Response_

// alias to use template instance with default allocator
using PlayAudio_Response =
  musia_msgs::srv::PlayAudio_Response_<std::allocator<void>>;

// constant definitions

}  // namespace srv

}  // namespace musia_msgs


// Include directives for member types
// Member 'info'
#include "service_msgs/msg/detail/service_event_info__struct.hpp"

#ifndef _WIN32
# define DEPRECATED__musia_msgs__srv__PlayAudio_Event __attribute__((deprecated))
#else
# define DEPRECATED__musia_msgs__srv__PlayAudio_Event __declspec(deprecated)
#endif

namespace musia_msgs
{

namespace srv
{

// message struct
template<class ContainerAllocator>
struct PlayAudio_Event_
{
  using Type = PlayAudio_Event_<ContainerAllocator>;

  explicit PlayAudio_Event_(rosidl_runtime_cpp::MessageInitialization _init = rosidl_runtime_cpp::MessageInitialization::ALL)
  : info(_init)
  {
    (void)_init;
  }

  explicit PlayAudio_Event_(const ContainerAllocator & _alloc, rosidl_runtime_cpp::MessageInitialization _init = rosidl_runtime_cpp::MessageInitialization::ALL)
  : info(_alloc, _init)
  {
    (void)_init;
  }

  // field types and members
  using _info_type =
    service_msgs::msg::ServiceEventInfo_<ContainerAllocator>;
  _info_type info;
  using _request_type =
    rosidl_runtime_cpp::BoundedVector<musia_msgs::srv::PlayAudio_Request_<ContainerAllocator>, 1, typename std::allocator_traits<ContainerAllocator>::template rebind_alloc<musia_msgs::srv::PlayAudio_Request_<ContainerAllocator>>>;
  _request_type request;
  using _response_type =
    rosidl_runtime_cpp::BoundedVector<musia_msgs::srv::PlayAudio_Response_<ContainerAllocator>, 1, typename std::allocator_traits<ContainerAllocator>::template rebind_alloc<musia_msgs::srv::PlayAudio_Response_<ContainerAllocator>>>;
  _response_type response;

  // setters for named parameter idiom
  Type & set__info(
    const service_msgs::msg::ServiceEventInfo_<ContainerAllocator> & _arg)
  {
    this->info = _arg;
    return *this;
  }
  Type & set__request(
    const rosidl_runtime_cpp::BoundedVector<musia_msgs::srv::PlayAudio_Request_<ContainerAllocator>, 1, typename std::allocator_traits<ContainerAllocator>::template rebind_alloc<musia_msgs::srv::PlayAudio_Request_<ContainerAllocator>>> & _arg)
  {
    this->request = _arg;
    return *this;
  }
  Type & set__response(
    const rosidl_runtime_cpp::BoundedVector<musia_msgs::srv::PlayAudio_Response_<ContainerAllocator>, 1, typename std::allocator_traits<ContainerAllocator>::template rebind_alloc<musia_msgs::srv::PlayAudio_Response_<ContainerAllocator>>> & _arg)
  {
    this->response = _arg;
    return *this;
  }

  // constant declarations

  // pointer types
  using RawPtr =
    musia_msgs::srv::PlayAudio_Event_<ContainerAllocator> *;
  using ConstRawPtr =
    const musia_msgs::srv::PlayAudio_Event_<ContainerAllocator> *;
  using SharedPtr =
    std::shared_ptr<musia_msgs::srv::PlayAudio_Event_<ContainerAllocator>>;
  using ConstSharedPtr =
    std::shared_ptr<musia_msgs::srv::PlayAudio_Event_<ContainerAllocator> const>;

  template<typename Deleter = std::default_delete<
      musia_msgs::srv::PlayAudio_Event_<ContainerAllocator>>>
  using UniquePtrWithDeleter =
    std::unique_ptr<musia_msgs::srv::PlayAudio_Event_<ContainerAllocator>, Deleter>;

  using UniquePtr = UniquePtrWithDeleter<>;

  template<typename Deleter = std::default_delete<
      musia_msgs::srv::PlayAudio_Event_<ContainerAllocator>>>
  using ConstUniquePtrWithDeleter =
    std::unique_ptr<musia_msgs::srv::PlayAudio_Event_<ContainerAllocator> const, Deleter>;
  using ConstUniquePtr = ConstUniquePtrWithDeleter<>;

  using WeakPtr =
    std::weak_ptr<musia_msgs::srv::PlayAudio_Event_<ContainerAllocator>>;
  using ConstWeakPtr =
    std::weak_ptr<musia_msgs::srv::PlayAudio_Event_<ContainerAllocator> const>;

  // pointer types similar to ROS 1, use SharedPtr / ConstSharedPtr instead
  // NOTE: Can't use 'using' here because GNU C++ can't parse attributes properly
  typedef DEPRECATED__musia_msgs__srv__PlayAudio_Event
    std::shared_ptr<musia_msgs::srv::PlayAudio_Event_<ContainerAllocator>>
    Ptr;
  typedef DEPRECATED__musia_msgs__srv__PlayAudio_Event
    std::shared_ptr<musia_msgs::srv::PlayAudio_Event_<ContainerAllocator> const>
    ConstPtr;

  // comparison operators
  bool operator==(const PlayAudio_Event_ & other) const
  {
    if (this->info != other.info) {
      return false;
    }
    if (this->request != other.request) {
      return false;
    }
    if (this->response != other.response) {
      return false;
    }
    return true;
  }
  bool operator!=(const PlayAudio_Event_ & other) const
  {
    return !this->operator==(other);
  }
};  // struct PlayAudio_Event_

// alias to use template instance with default allocator
using PlayAudio_Event =
  musia_msgs::srv::PlayAudio_Event_<std::allocator<void>>;

// constant definitions

}  // namespace srv

}  // namespace musia_msgs

namespace musia_msgs
{

namespace srv
{

struct PlayAudio
{
  using Request = musia_msgs::srv::PlayAudio_Request;
  using Response = musia_msgs::srv::PlayAudio_Response;
  using Event = musia_msgs::srv::PlayAudio_Event;
};

}  // namespace srv

}  // namespace musia_msgs

#endif  // MUSIA_MSGS__SRV__DETAIL__PLAY_AUDIO__STRUCT_HPP_
