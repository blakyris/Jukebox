<?php

namespace App\Controller\API\FileManager;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ODM\MongoDB\DocumentManager as DocumentManager;

use App\Service\TagEditor;
use App\Service\LibraryManager;

use App\Document\Artist;
use App\Document\Album;
use App\Document\Track;

class UploadController
{
    /**
     * @Route("/api/upload/tracks", methods={"POST"})
     */
    public function upload(DocumentManager $dm, Request $request, LibraryManager $libraryManager, TagEditor $tagEditor)
    {
        $file = $request->files->get('file');
        if ($file) {
            $path = $file->getPath() . "/" . $file->getFileName();
            //$tags = $tagEditor->getTags($filename);
            $libraryManager->addFileToLibrary($path);
            return new JsonResponse(['status' => "success"]);
        } else {
            return new JsonResponse(['Error' => "An error occured while uploading files. Please try again."]);
        }
    }
}
