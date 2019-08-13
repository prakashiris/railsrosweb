/**
 * @author Russell Toris - rctoris@wpi.edu
 */

/**
 * Manages connection to the server and all interactions with ROS.
 *
 * Emits the following events:
 *   * 'change' - emitted with a change in speed occurs
 *
 * @constructor
 * @param options - possible keys include:
 *   * ros - the ROSLIB.Ros connection handle
 *   * topic (optional) - the Twist topic to publish to, like '/cmd_vel'
 *   * throttle (optional) - a constant throttle for the speed
 */


KEYBOARDTELEOP.Teleop = function(options) {
    var that = this;
    options = options || {};
    var ros = options.ros;
    var topic = options.topic || '/cmd_vel';
    // permanent throttle
    var throttle = options.throttle || 1.0;

    // used to externally throttle the speed (e.g., from a slider)
    this.scale = 1.0;
    let last_key = 0;

    // Forward, Backward, Left, Right
    let linear_direction_keys = [73, 188, 74, 76, 75];
    // FL, FR, BL, BR
    let multi_direction_keys = [85, 79, 77, 190];
    let direction_keys = linear_direction_keys.concat(multi_direction_keys);

    // L+, L-, L/A+, L/A-
    let linear_control_keys = [87, 88, 81, 90];
    // A+, A-, L/A+, L/A-
    let angular_control_keys = [69, 67, 81, 90];
    let control_keys = linear_control_keys.concat(angular_control_keys);

    let published_x = 0, published_z = 0;
    let current_x = 0.5, current_z = 1.0;

    document.getElementById("linear-current").innerHTML = current_x.toFixed(4);
    document.getElementById("angular-current").innerHTML = current_z.toFixed(4);
    document.getElementById("linear-published").innerHTML = published_x.toFixed(4);
    document.getElementById("angular-published").innerHTML = published_z.toFixed(4);

    let cmdVel = new ROSLIB.Topic({
        ros : ros,
        name : topic,
        messageType : 'geometry_msgs/Twist'
    });

    this.incrementValue = function (value) {
        return value + (value/10)
    };

    this.decrementValue = function (value) {
        return value - (value/10)
    };

    // sets up a key listener on the page used for keyboard teleoperation
    this.handleKey = function(keyCode) {
        let currentCode = 0;
        let pub = true;
        let incrementValue = this.incrementValue;
        let decrementValue = this.decrementValue;

        if ((direction_keys.indexOf(keyCode) === -1) && (control_keys.indexOf(keyCode) === -1)) {
            return
        }
        else if (direction_keys.indexOf(keyCode) !== -1) {
            currentCode = keyCode;
        }



        if (last_key !== 0) {
            switch (keyCode) {
                //increase linear and angular
                case 81:
                    current_x = incrementValue(current_x);
                    current_z = incrementValue(current_z);
                    break;
                //decrease linear and angular
                case 90:
                    current_x = decrementValue(current_x);
                    current_z = decrementValue(current_z);
                    break;
                //increase linear and angular
                case 87:
                    current_x = incrementValue(current_x);
                    break;
                case 88:
                    current_x = decrementValue(current_x);
                    break;
                case 69:
                    current_z = incrementValue(current_z);
                    break;
                case 67:
                    current_z = decrementValue(current_z);
                    break;

            }
            document.getElementById("linear-current").innerHTML = current_x.toFixed(4);
            document.getElementById("angular-current").innerHTML = current_z.toFixed(4);
        }

        let key = currentCode || last_key;
        // direction Key function
        switch (key) {
            case 73:
                // up
                published_x = current_x;
                published_z = 0;
                break;
            case 74:
                // turn left
                published_x = 0;
                published_z = current_z;
                break;
            case 76:
                // turn right
                published_x = 0;
                published_z = -current_z;
                break;
            case 188:
                // down
                published_x = -current_x;
                published_z = 0;
                break;
            case 75:
                //stop
                published_x = 0;
                published_z = 0;
                break;
            case 85:
                //forward left
                published_x = current_x;
                published_z = current_z;
                break;
            case 79:
                //forward right
                published_x = current_x;
                published_z = -current_z;
                break;
            case 77:
                //backward left
                published_x = -current_x;
                published_z = current_z;
                break;
            case 190:
                //backward right
                published_x = -current_x;
                published_z = -current_z;
                break;
            default:
                pub = false;
        }

        if (direction_keys.indexOf(keyCode) !== -1) {
            last_key = keyCode
        }

        // publish the command
        if (pub) {
            let twist = new ROSLIB.Message({
                angular : {
                    x : 0,
                    y : 0,
                    z : published_z,

                },
                linear : {
                    x : published_x,
                    y : 0,
                    z : 0
                }
            });
            cmdVel.publish(twist);

            document.getElementById("linear-published").innerHTML = published_x.toFixed(4);
            document.getElementById("angular-published").innerHTML = published_z.toFixed(4);

            // check for changes
            if (published_z !== current_x || published_z !== current_z) {
                that.emit('change', twist);
            }
        }
    };

    // handle the key
    var body = document.getElementsByTagName('body')[0];
    body.addEventListener('keydown', function(e) {
        that.handleKey(e.keyCode);
    }, false);

    // handle the ui click
    $(".control-Btn").on("click", function(e) {
        that.handleKey(Number(e.currentTarget.value));
    });
};
KEYBOARDTELEOP.Teleop.prototype.__proto__ = EventEmitter2.prototype;
