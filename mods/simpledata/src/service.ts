/*
 * Copyright (C) 2022 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster/routr
 *
 * This file is part of Routr
 *
 * Licensed under the MIT License (the "License");
 * you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 *    https://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {SimpleDataConfig} from "./types"
import {resources} from "./grpc_server"
import {nyi} from "./utils"
import {find, get} from "./api"
import logger from "@fonoster/logger"
import grpc = require("@grpc/grpc-js")

/**
 * Starts a new simple data service.
 *
 * @param {SimpleDataConfig} config - the configuration of the service
 */
export default function simpleDataService(config: SimpleDataConfig): void {
  const {bindAddr} = config
  logger.info("starting routr service", {bindAddr, name: "simpledata"})
  const server = new grpc.Server()

  server.addService(resources.v2draft1.Resources.service, {
    get: get(config.resources),
    find: find(config.resources),
    delete: nyi,
    update: nyi,
    create: nyi,
    list: nyi
  })

  server.bindAsync(
    config.bindAddr,
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start()
    }
  )
}