
      function init() {
        // ----------------------------------------------------------------------
        // Connecting to rosbridge
        // ----------------------------------------------------------------------

        // The Ros object is responsible for connecting to rosbridge.

        var ros = new ROSLIB.Ros();
        // When a connection is established with rosbridge, a 'connection' event
        // is emitted. In the event callback, we print a success message to the
        // screen.
        ros.on('connection', function() {
          // displaySuccess is a convenience function for outputting messages in
          // HTML.
          displaySuccess('Roslibjs connected to rosbridge.');
        });
        // Connects to rosbridge.
        ros.connect('ws://192.168.31.72:9090');
        // ----------------------------------------------------------------------
        // Subscribing to the robot's Pose
        // ----------------------------------------------------------------------
        //Initialize the teleop.

        //   var listener = new ROSLIB.Topic({
        //     ros : ros,
        //     name : '/audio',

        //     messageType : 'audio_common_msgs/AudioData'
        //   });
        // ​
          // Then we add a callback to be called every time a message is published on this topic.
        //   listener.subscribe(function(message) {
        //     console.log('Received message on ' + listener.name + ': ' + String(message.data));
        // ​
        //     // If desired, we can unsubscribe from the topic as well.
        // ​
        //   });

        var teleop = new KEYBOARDTELEOP.Teleop({
          ros : ros,
          topic : '/robot_base/cmd_vel'
        });

      //   var viewer = new MJPEGCANVAS.Viewer({
      //   divID : 'mjpeg',
      //   host: "192.168.0.127",
      //   width : 640,
      //   height : 480,
      //   topic : '/camera/rgb/image_raw',
      //   interval: 200
      // });
      var viewer2D = new ROS2D.Viewer({
        divID : 'twod-map',
        width : 1000,
        height : 400,

      });

        // The ROSLIB.Topic handles subscribing and publishing a ROS topic. This
        // topic interacts with the /robot_pose topic, published by the robot.
        var poseTopic = new ROSLIB.Topic({
          ros         : ros,
          name        : '/robot_pose',
          messageType : 'geometry_msgs/Pose'
        });
        // Subscribes to the robot's pose. When rosbridge receives the pose
        // message from ROS, it forwards the message to roslibjs, which calls this
        // callback.
        poseTopic.subscribe(function(message) {
          // Formats the pose for outputting.
          var now = new Date();
          var position = 'x: ' + message.position.x
                  + ', y: ' + message.position.y
                  + ', z: 0.0';
          var orientation = 'x: ' + message.orientation.x
                  + ', y: ' + message.orientation.y
                  + ', z: ' + message.orientation.z
                  + ', w: ' + message.orientation.w;
          // Prepends a row to the "poses" table with the formatted pose.
          $('#poses > tbody > tr:first').after('<tr>'
                  + '<td>' + now.toLocaleTimeString() + '</td>'
                  + '<td>' + position + '</td>'
                  + '<td>' + orientation + '</td>');
        });

        // ----------------------------------------------------------------------
        // Displaying a map
        // ----------------------------------------------------------------------

        // The ROS2D.Viewer is a 2D scene manager with additional ROS
        // functionality.


        // viewer2D.shift(10, -50);
        // Subscribes to the robot's OccupancyGrid, which is ROS representation of
        // the map, and renders the map in the scene.
        var gridClient = new ROS2D.OccupancyGridClient({
          ros : ros,
          rootObject : viewer2D.scene
        });
        // Scale the canvas to fit to the map
        gridClient.on('change', function() {
          viewer2D.scaleToDimensions(gridClient.currentGrid.width, gridClient.currentGrid.height);
          viewer2D.shift(gridClient.currentGrid.pose.position.x, gridClient.currentGrid.pose.position.y);
          displayPoseMarker();
          // console.log(gridClient.currentGrid.pose.position.x);
        });
            // Setup the nav client.
            console.log('asa')
       var nav =  NAV2D.OccupancyGridClientNav({
            ros : ros,
            rootObject : viewer2D.scene,
            viewer : viewer2D,
            serverName : '/move_base'
         });
         console.log("asas")


        //  viewer2D.shift(-120,50);
        // ----------------------------------------------------------------------
        // Showing the pose on the map
        // ----------------------------------------------------------------------

        function displayPoseMarker() {
          // Create a marker representing the robot.
          var robotMarker = new ROS2D.NavigationArrow({
            size : 5,
            strokeSize : 0,
            fillColor : createjs.Graphics.getRGB(25, 128, 0, 0.66),
            pulse : true
          });
          robotMarker.visible = false;

          // Add the marker to the 2D scene.
          gridClient.rootObject.addChild(robotMarker);
          var initScaleSet = false;

          // Subscribe to the robot's pose updates.
          var poseListener = new ROSLIB.Topic({
            ros : ros,
            name : '/robot_pose',
            messageType : 'geometry_msgs/Pose',
            throttle_rate : 10
          });
          poseListener.subscribe(function(pose) {
            // Orientate the marker based on the robot's pose.
            robotMarker.x = pose.position.x;
            robotMarker.y = -pose.position.y;
            if (!initScaleSet) {
              robotMarker.scaleX = 1.0 / viewer2D.scene.scaleX;
              robotMarker.scaleY = 1.0 / viewer2D.scene.scaleY;
              initScaleSet = true;
            }

            robotMarker.rotation = viewer2D.scene.rosQuaternionToGlobalTheta(pose.orientation);
            robotMarker.visible = true;

          });
        }
        }


        // ----------------------------------------------------------------------
        // Rendering the robot in 3D
        // ----------------------------------------------------------------------

        // Create the scene manager and view port for the 3D world.
        // var viewer3D = new ROS3D.Viewer({
        //   divID      : 'threed-map',
        //   width      : 600,
        //   height     : 300,
        //   antialias  : true,
        //   background : '#EEEEEE'
        // });

        // // Create a TF client that subscribes to the fixed frame.
        // var tfClient = new ROSLIB.TFClient({
        //   ros          : ros,
        //   angularThres : 0.01,
        //   transThres   : 0.01,
        //   rate         : 10.0
        // });

        // // Add the URDF model of the robot.
        // var urdfClient = new ROS3D.UrdfClient({
        //   ros        : ros,
        //   tfClient   : tfClient,
        //   path       : 'http://resources.robotwebtools.org/',
        //   rootObject : viewer3D.scene
        // });

        // // ----------------------------------------------------------------------
        // // Rendering the map in 3D
        // // ----------------------------------------------------------------------

        // // Add the Occupancy Grid map.
        // var grid = new ROS3D.OccupancyGridClient({
        //   ros        : ros,
        //   tfClient   : tfClient,
        //   rootObject : viewer3D.scene
        // });
        // grid.on('change', function() {
        //   // Change the opacity level.
        //   grid.currentGrid.children[0].material.transparent = true;
        //   grid.currentGrid.children[0].material.opacity = 0.25;
        //   grid.currentGrid.children[0].material.needsUpdate = true;
        // });

        // // ----------------------------------------------------------------------
        // // 3D all the things
        // // ----------------------------------------------------------------------

        // // Load the 3D mesh of the Willow Garage floorplan.
        // var building = new ROS3D.SceneNode({
        //   tfClient : tfClient,
        //   frameID  : '/map',
        //   object   : new ROS3D.MeshResource({
        //     path     : 'http://resources.robotwebtools.org/models/willow_garage/',
        //     resource : 'willow.dae'
        //   }),
        //   pose : new ROSLIB.Pose({
        //     position : {
        //       x : 18.5,
        //       y : 66.75,
        //       z : 0
        //     },
        //     orientation : {
        //       x : 0,
        //       y : 0,
        //       z : -0.83602597651332,
        //       w : 0.5486898637618064
        //     }
        //   })
        // });
        // // Add the floorplan mesh to the 3D scene.
        // viewer3D.addObject(building);

      /**
       * Setup all GUI elements when the page is loaded.
       */
