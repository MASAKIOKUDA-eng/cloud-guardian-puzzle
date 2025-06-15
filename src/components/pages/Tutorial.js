import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Tutorial = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const tutorialSteps = [
    {
      title: 'クラウド・ガーディアン：セキュアパズルへようこそ',
      content: (
        <>
          <p>このゲームでは、あなたは政府機関のクラウドセキュリティ専門家として、AWS GovCloudの仮想環境内でセキュリティパズルを解きながら、国家の重要インフラを守るミッションに挑戦します。</p>
          <p>このチュートリアルでは、ゲームの基本的な操作方法と目標について説明します。</p>
        </>
      ),
      image: '🏛️'
    },
    {
      title: 'ゲームの目的',
      content: (
        <>
          <p>各レベルでは、特定のセキュリティ課題に対応するためのAWSリソースを適切に配置し、セキュアなクラウドアーキテクチャを構築することが目標です。</p>
          <p>レベルごとに異なる目標と制約があり、それらを満たすことでミッションを成功させることができます。</p>
        </>
      ),
      image: '🎯'
    },
    {
      title: 'リソースの配置',
      content: (
        <>
          <p>画面左側の「利用可能なリソース」パネルから、必要なAWSリソースをドラッグして、右側のグリッドに配置します。</p>
          <p>リソースは適切な位置に配置する必要があります。例えば、プライベートサブネットはパブリックサブネットの後ろに配置するなど、セキュリティのベストプラクティスに従ってください。</p>
        </>
      ),
      image: '🔄'
    },
    {
      title: 'セキュリティルールの設定',
      content: (
        <>
          <p>リソースを配置した後、セキュリティグループやIAMポリシーなどのセキュリティ設定を行います。</p>
          <p>リソースをクリックすると、そのリソースの設定パネルが表示され、セキュリティルールを追加・編集できます。</p>
        </>
      ),
      image: '🔒'
    },
    {
      title: 'コンプライアンス要件',
      content: (
        <>
          <p>政府機関のクラウド環境では、FedRAMP、FISMA、HIPAAなどの規制に準拠する必要があります。</p>
          <p>各レベルでは、これらのコンプライアンス要件を満たすようにアーキテクチャを設計してください。</p>
        </>
      ),
      image: '📜'
    },
    {
      title: 'スコアとフィードバック',
      content: (
        <>
          <p>解答を提出すると、あなたのアーキテクチャがセキュリティとコンプライアンスの観点から評価されます。</p>
          <p>スコアとフィードバックを確認し、必要に応じてアーキテクチャを改善してください。</p>
        </>
      ),
      image: '📊'
    },
    {
      title: 'チュートリアル完了',
      content: (
        <>
          <p>これでチュートリアルは完了です！実際のミッションに挑戦する準備ができました。</p>
          <p>初級レベルから始めて、徐々に難しいチャレンジに挑戦していきましょう。国家の重要インフラを守るのはあなたの手にかかっています！</p>
        </>
      ),
      image: '🚀'
    }
  ];
  
  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const currentTutorial = tutorialSteps[currentStep];
  
  return (
    <div className="tutorial-page">
      <h2 style={{ textAlign: 'center', margin: '2rem 0' }}>チュートリアル</h2>
      
      <div className="tutorial-container" style={{ 
        maxWidth: '800px', 
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        padding: '2rem'
      }}>
        <div className="tutorial-progress" style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          marginBottom: '2rem'
        }}>
          {tutorialSteps.map((_, index) => (
            <div 
              key={index}
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: index === currentStep ? '#ff9900' : index < currentStep ? '#232f3e' : '#e0e0e0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                fontWeight: 'bold'
              }}
            >
              {index + 1}
            </div>
          ))}
        </div>
        
        <div className="tutorial-content" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '64px', margin: '1rem 0' }}>
            {currentTutorial.image}
          </div>
          
          <h3 style={{ margin: '1rem 0' }}>{currentTutorial.title}</h3>
          
          <div style={{ margin: '2rem 0', textAlign: 'left' }}>
            {currentTutorial.content}
          </div>
        </div>
        
        <div className="tutorial-navigation" style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          marginTop: '2rem'
        }}>
          <button 
            className="btn" 
            onClick={handlePrev}
            disabled={currentStep === 0}
            style={{ 
              backgroundColor: currentStep === 0 ? '#e0e0e0' : '#232f3e',
              cursor: currentStep === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            前へ
          </button>
          
          {currentStep === tutorialSteps.length - 1 ? (
            <Link to="/levels" className="btn">
              レベル選択へ
            </Link>
          ) : (
            <button className="btn" onClick={handleNext}>
              次へ
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
