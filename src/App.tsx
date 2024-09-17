import React, { useEffect, useState } from 'react'
import './App.css'
import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer'
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';
import "@photo-sphere-viewer/markers-plugin/index.css";

interface Props {

}

const App: React.FC<Props> = () => {

  const [image, setImage] = useState<string>('img1.webp')
  const [plugins, setPlugins] = useState<any>([])

  const [view, setView] = useState<number>(1)

  const photoSphereRef = React.useRef();

  const handleReady = (instance: any) => {
    const markersPlugs = instance.getPlugin(MarkersPlugin);
    if (!markersPlugs) return;
    markersPlugs.addEventListener("select-marker", (e: any) => {
      //@ts-ignore
      photoSphereRef.current?.zoomIn(90)
      setTimeout(() => {
        const selectedView = e.marker.config.id
        switch(selectedView) {
          case "room1":
            if(view === 1) {
              setImage('img4.webp')
              setView(2)
            } else {
              setImage('img1.webp')
            }
            
            break;
          case "room2":
            if(view === 1) {
              setImage('img3.webp')
              setView(3)
            } else {
              setImage('img1.webp')
            }
            break;
          default:
            setImage('pic4.jpg')
        }
      }, 500)
      console.log("asd", e);
    });
  };

  useEffect(() => {
    setPlugins([
      [
        MarkersPlugin,
        {
          // list of markers
          markers: [
            {
              // image marker that opens the panel when clicked
              id: "room1",
              position: { yaw: "80deg", pitch: "16deg" },
              image: "pin-blue.png",
              anchor: "bottom center",
              size: { width: 32, height: 32 },
              tooltip: "Medium Lounge",
            },
            {
              // image marker that opens the panel when clicked
              id: "room2",
              position: { yaw: "270deg", pitch: "16deg" },
              image: "pin-red.png",
              anchor: "bottom center",
              size: { width: 32, height: 32 },
              tooltip: "Large Lounge",
            },
          ],
        },
      ]
    ])
  }, [])


  return (
    <div>{
      plugins.length && plugins.length > 0 && 
      <ReactPhotoSphereViewer
      //@ts-ignore
          ref={photoSphereRef}
          src={image}
          littlePlanet={true}
          hideNavbarButton={true}
          defaultYaw={'85deg'}
          height={"100vh"}
          width={"100vw"}
          maxFov={130}
          juaternion={true}
          moveSpeed={5}
          onReady={handleReady}
          plugins={plugins}
        />
    }

    </div>
  )
}

export default App
