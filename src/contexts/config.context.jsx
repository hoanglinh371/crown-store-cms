import { createContext, useEffect, useState } from 'react';

import instance from '@/services/axios';

const ConfigContext = createContext({
  configs: null,
});

function ConfigProvider({ children }) {
  const [configs, setConfigs] = useState();

  useEffect(() => {
    const getConfigs = async () => {
      const response = await instance.get('/configs');
      setConfigs(response.data.configs);
    };

    getConfigs();
  }, []);

  return (
    <ConfigContext.Provider
      value={{
        configs,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

export { ConfigContext };
export default ConfigProvider;
