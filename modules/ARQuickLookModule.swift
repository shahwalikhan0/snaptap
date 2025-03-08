// ARQuickLookModule.swift

import UIKit
import ARKit
import QuickLook

@objc(ARQuickLookModule)
class ARQuickLookModule: NSObject, QLPreviewControllerDataSource {
  private var url: URL?
  
  @objc func presentARQuickLook(_ fileUrl: String) {
    guard let url = URL(string: fileUrl) else { return }
    self.url = url
    
    DispatchQueue.main.async {
      let previewController = QLPreviewController()
      previewController.dataSource = self
      
      if let rootVC = UIApplication.shared.keyWindow?.rootViewController {
        rootVC.present(previewController, animated: true)
      }
    }
  }
  
  func numberOfPreviewItems(in controller: QLPreviewController) -> Int {
    return url != nil ? 1 : 0
  }
  
  func previewController(_ controller: QLPreviewController, previewItemAt index: Int) -> QLPreviewItem {
    return url! as QLPreviewItem
  }
}