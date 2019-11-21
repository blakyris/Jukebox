<?php

namespace App\Controller\API\FileManager;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Filesystem\Exception\IOExceptionInterface;
use Symfony\Component\Filesystem\Filesystem;
use Doctrine\ODM\MongoDB\DocumentManager as DocumentManager;

use App\Service\TagEditor;
use App\Service\LibraryManager;

use App\Document\Artist;
use App\Document\Album;
use App\Document\Track;

class UploadController extends AbstractController
{
    /**
     * @Route("/api/upload/tracks", methods={"POST"})
     */
    public function upload(DocumentManager $dm, Request $request, LibraryManager $libraryManager, TagEditor $tagEditor)
    {
        $filesystem = new Filesystem();
        $file = $request->files->get('file');

        if ($file) {
            $tempDir = $this->getParameter('kernel.project_dir').'/tmp';
            $id = uniqid();
            $filepath = $tempDir . "/" . $id;
            $file->move($tempDir, $id);

            $libraryManager->addFileToLibrary($filepath);

            $filesystem->remove($filepath);

            return new JsonResponse(['status' => "success"]);
        } else {
            return new JsonResponse(['Error' => "An error occured while uploading files. Please try again."]);
        }
    }
}
