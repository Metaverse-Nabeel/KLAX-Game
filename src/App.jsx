import GameplayArea from './components/GamePlayArea';
import Navigation from './components/Navigation';
import "./App.css"

const App = () => {
  return (
    <>
    <Navigation />
    <div className='App'>
      <div className="submission">
        <h4 className="project">Project By:</h4>
        <p className="title">Arooj & Nabeel</p>
      </div>
      <div className="gameInstr">
        Note: Press &quot;s&quot; or &quot;S&quot; to select the alphabet.
      </div>
      <GameplayArea />
      </div>
    </>
  );
};

export default App;
