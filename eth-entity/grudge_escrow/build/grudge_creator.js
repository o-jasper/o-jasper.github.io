function createContract(key, fun) {
    transact_code(key, "600060005460206020546040604054606060605433600053576101ca806100276000396101f158600060005460206020546040604054606060605460005356330e0f61002a596000606053560e61002c5860000f6100a4596002602036040e0f6100615960003560205357602035604053576c7072696365206368616e67656460805460206080f26001602036040e0f6100915966737569636964656000350e0f6100915933ff67737569636964656460a054602060a0f269706f696e746c6573733f60c054602060c0f26000602053560e0f6100c5596b6e6f206f666665722079657460e054602060e0f260605356610100546000610100530e0f61013a596020535630310c0f610124596b696e73756666696369656e746101205460206101406020610120343360645c03f15061014053506b696e73756666696369656e74610160546020610160f2336060535765626f75676874610180546020610180f261010053330e0f6101b759666765746261636b6101a05460206101c060206101a0604053563360645c03f1506101c05350667061796d656e746101e054602061020060206101e030316000535660645c03f15061020053506000602053576000604053576000606053576772656c6561736564610220546020610220f267737472616e676572610240546020610240f26000f2", fun);
}