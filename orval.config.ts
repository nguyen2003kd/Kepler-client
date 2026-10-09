import axios from 'axios'
import { config as loadEnv } from 'dotenv'
import { defineConfig } from 'orval'

loadEnv()

const orvalConfig = async () => {
  const { default: baseConfig } = await import('./src/configs/base')
  const { backendDomain, frontendDomain } = baseConfig

  const [keplerPropertyBESwagger] = await Promise.all([
    axios.get(`${backendDomain}/swagger-output.json`, {
      headers: { Origin: frontendDomain }
    })
  ])

  return defineConfig({
    'kepler-property-be': {
      output: {
        mode: 'tags',
        target: 'src/api/endpoints',
        schemas: 'src/api/models',
        client: 'react-query',
        override: {
          query: {
            useQuery: true,
            useInfinite: false // ❌ tắt global infinite
          },
          mutator: {
            path: 'src/api/mutator/custom-instance.ts',
            name: 'mainInstance'
          },
          header: () => '/* eslint-disable */\r\n',

          // ✅ chỉ bật infinite cho API cần page
          operations: {
            getPosts: {
              query: {
                useInfinite: true,
                useInfiniteQueryParam: 'page'
              }
            },

            // giữ nguyên cái cũ của bạn
            postSystemBackup: {
              mutator: {
                path: 'src/api/mutator/fetch-instance.ts',
                name: 'fetchInstance'
              }
            }
          }
        }
      },
      input: {
        target: keplerPropertyBESwagger.data,
        filters: {
          tags: ['Authentication', /(((Library)|(Module)) - )?/]
        }
      }
    }
  })
}

export default orvalConfig