<?php

namespace App\Controller\API\Library;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ODM\MongoDB\DocumentManager as DocumentManager;

use App\Document\Album;

class AlbumController extends AbstractController
{
    /**
     * @Route("/api/library/albums", methods={"GET"})
     */
    public function getAll(DocumentManager $dm)
    {
        $albums = $dm->getRepository(Album::class)->findAll();
        
        $json = array();
        foreach ($albums as $album)
            $json[] = $album->getProperties();

        return new JsonResponse($json);
    }

    /**
     * @Route("/api/library/albums/{id}/cover", methods={"GET"})
     */
    public function streamTrack(DocumentManager $documentManager, $id)
    {
        $album = $documentManager->getRepository(Album::class)->findOneBy(['id' => $id]);
        $cover = $album->getCover();
        $len = strlen($cover);
        
        $response = new StreamedResponse();
        $response->headers->set('X-Accel-Buffering', 'no');
        $response->headers->set('Transfer-Encoding', 'chunked');
        $response->headers->set('Content-Range', 'bytes 0-' . $len);
        $response->headers->set('Content-Transfer-Encoding', 'binary');
        $response->headers->set('Content-Type', "image/jpeg");
        $response->headers->set('Content-Length', $len);
        $response->headers->set('Accept-Ranges', 'bytes');

        $response->setCallback(function () use ($cover) {
            echo $cover;
            ob_flush();
            flush();
        });
        
        return $response->send();
    }
}
