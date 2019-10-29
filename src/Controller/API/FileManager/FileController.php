<?php

namespace App\Controller\API\FileManager;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ODM\MongoDB\DocumentManager as DocumentManager;

use App\Service\TagEditor;
use App\Service\FileManager;
use App\Service\LibraryManager;

use App\Document\Artist;
use App\Document\Album;
use App\Document\Track;

class FileController
{
     /**
      * 
      * @Route("/api/add/files/from_directory", methods={"POST"})
      * 
      * @return JsonResponse
      */
    public function scanDirectory (
        DocumentManager $dm, Request $request, 
        FileManager $fileManager, TagEditor $tagger, LibraryManager $libraryManager )
    {
        $response = array();
        $files = $fileManager->scan($request->request->get('path'));
        if ($files) {
            foreach ($files as $file) {
                $libraryManager->addFileToLibrary($file);
                return new JsonResponse(['status' => "success"]);
            }
            
        }
        else return new JsonResponse(['status' => "error"]);
    }
}
