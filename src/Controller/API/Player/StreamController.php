<?php

namespace App\Controller\API\Player;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ODM\MongoDB\DocumentManager as DocumentManager;

use App\Document\Artist;
use App\Document\Album;

class StreamController
{
    /**
     * @Route("/api/stream/track/{id}", methods={"GET"})
     */
    public function searchArtist(DocumentManager $dm, $id)
    {
        $artist = $dm->getRepository(Artist::class)->findById($id);

        $response = new StreamedResponse();

        

        $response->setCallback(function () {
            var_dump('Hello World');
            flush();
            sleep(2);
            var_dump('Hello World');
            flush();
        });

        $response->send();
    }
}
